const fs = require("fs");
const path = require("path");
const https = require("https");

const USERNAME = process.env.BEHANCE_USERNAME || "dedgrl";
const API_KEY = process.env.REACT_APP_BEHANCE_API_KEY || process.env.BEHANCE_API_KEY;
const OUTPUT = path.join(__dirname, "..", "public", "behance-projects.json");

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html,application/json",
          },
        },
        (response) => {
          if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            fetchText(response.headers.location).then(resolve).catch(reject);
            return;
          }

          let data = "";
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            if (response.statusCode !== 200) {
              reject(new Error(`HTTP ${response.statusCode} for ${url}`));
              return;
            }
            resolve(data);
          });
        }
      )
      .on("error", reject);
  });
}

function slugToTitle(slug) {
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}

function parseProjectsFromHtml(html) {
  const projects = [];
  const seen = new Set();
  const galleryPattern = /\/gallery\/(\d+)\/([^"'?#/\\]+)/g;

  for (const match of html.matchAll(galleryPattern)) {
    const id = match[1];
    if (seen.has(id)) continue;
    seen.add(id);
    projects.push({
      id,
      slug: match[2],
      title: slugToTitle(match[2]),
    });
  }

  return projects;
}

async function fetchFromApi() {
  if (!API_KEY) return null;

  const url = `https://www.behance.net/v2/users/${USERNAME}/projects?per_page=48&api_key=${API_KEY}`;
  const body = await fetchText(url);
  const json = JSON.parse(body);

  if (!json.projects || !Array.isArray(json.projects)) {
    throw new Error("Behance API returned no projects array");
  }

  return json.projects.map((project) => ({
    id: String(project.id),
    slug: project.slug || project.name?.toLowerCase().replace(/\s+/g, "-") || String(project.id),
    title: project.name || `Project ${project.id}`,
    url: project.url || `https://www.behance.net/gallery/${project.id}`,
    coverUrl:
      project.covers?.max_1200 ||
      project.covers?.["404"] ||
      project.covers?.original ||
      project.covers?.max_404 ||
      null,
  }));
}

async function fetchFromProfile() {
  const html = await fetchText(`https://www.behance.net/${USERNAME}`);
  return parseProjectsFromHtml(html).map((project) => ({
    ...project,
    url: `https://www.behance.net/gallery/${project.id}/${project.slug}`,
  }));
}

async function main() {
  let projects = [];
  let source = "profile";

  try {
    const apiProjects = await fetchFromApi();
    if (apiProjects) {
      projects = apiProjects;
      source = "api";
    }
  } catch (error) {
    console.warn("Behance API sync skipped:", error.message);
  }

  if (!projects.length) {
    projects = await fetchFromProfile();
    source = "profile";
  }

  const payload = {
    username: USERNAME,
    profileUrl: `https://www.behance.net/${USERNAME}`,
    updatedAt: new Date().toISOString(),
    source,
    projects,
  };

  fs.writeFileSync(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Synced ${projects.length} Behance project(s) via ${source} -> ${OUTPUT}`);
}

main().catch((error) => {
  console.warn("Behance sync failed:", error.message);

  if (fs.existsSync(OUTPUT)) {
    console.warn("Keeping existing behance-projects.json");
    process.exit(0);
    return;
  }

  const fallback = {
    username: USERNAME,
    profileUrl: `https://www.behance.net/${USERNAME}`,
    updatedAt: new Date().toISOString(),
    source: "fallback",
    projects: [],
  };

  fs.writeFileSync(OUTPUT, `${JSON.stringify(fallback, null, 2)}\n`, "utf8");
  console.warn("Wrote empty Behance manifest fallback");
  process.exit(0);
});
