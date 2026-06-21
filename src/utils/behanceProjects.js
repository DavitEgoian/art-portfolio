const BEHANCE_USERNAME = process.env.REACT_APP_BEHANCE_USERNAME || "dedgrl";
const BEHANCE_API_KEY = process.env.REACT_APP_BEHANCE_API_KEY;

const GALLERY_PATTERN = /\/gallery\/(\d+)\/([^"'?#/\\]+)/g;

function slugToTitle(slug) {
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}

export function parseBehanceProjectsFromHtml(html) {
  const projects = [];
  const seen = new Set();

  for (const match of html.matchAll(GALLERY_PATTERN)) {
    const id = match[1];
    if (seen.has(id)) continue;
    seen.add(id);
    projects.push({
      id,
      slug: match[2],
      title: slugToTitle(match[2]),
      url: `https://www.behance.net/gallery/${id}/${match[2]}`,
    });
  }

  return projects;
}

function normalizeApiProjects(projects) {
  return projects.map((project) => ({
    id: String(project.id),
    slug: project.slug || String(project.id),
    title: project.name || `Project ${project.id}`,
    url: project.url || `https://www.behance.net/gallery/${project.id}`,
  }));
}

async function fetchFromBehanceApi(username = BEHANCE_USERNAME) {
  if (!BEHANCE_API_KEY) return null;

  const response = await fetch(
    `https://www.behance.net/v2/users/${username}/projects?per_page=48&api_key=${BEHANCE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Behance API responded with ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data.projects)) {
    throw new Error("Behance API returned an unexpected payload");
  }

  return normalizeApiProjects(data.projects);
}

async function fetchFromBehanceProfile(username = BEHANCE_USERNAME) {
  const response = await fetch(`https://www.behance.net/${username}`, {
    headers: { Accept: "text/html" },
  });

  if (!response.ok) {
    throw new Error(`Behance profile responded with ${response.status}`);
  }

  const html = await response.text();
  const projects = parseBehanceProjectsFromHtml(html);

  if (!projects.length) {
    throw new Error("No Behance projects found on profile page");
  }

  return projects;
}

async function fetchFromCachedManifest() {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/behance-projects.json?ts=${Date.now()}`
  );

  if (!response.ok) {
    throw new Error(`Cached Behance manifest responded with ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.projects) ? data.projects : [];
}

export function getBehanceEmbedUrl(projectId) {
  return `https://www.behance.net/embed/project/${projectId}?ilo0=1`;
}

/** Behance embed layout width; used to scale down and prevent horizontal scroll. */
export const BEHANCE_EMBED_NATIVE_WIDTH = 808;

export async function fetchBehanceProjects(username = BEHANCE_USERNAME) {
  try {
    const apiProjects = await fetchFromBehanceApi(username);
    if (apiProjects?.length) {
      return { projects: apiProjects, source: "api" };
    }
  } catch (error) {
    console.warn("Behance API fetch failed:", error.message);
  }

  try {
    const profileProjects = await fetchFromBehanceProfile(username);
    return { projects: profileProjects, source: "profile" };
  } catch (error) {
    console.warn("Behance profile fetch failed:", error.message);
  }

  const cachedProjects = await fetchFromCachedManifest();
  return { projects: cachedProjects, source: "cache" };
}

export const BEHANCE_PROFILE_URL = `https://www.behance.net/${BEHANCE_USERNAME}`;
