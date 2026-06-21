import { useCallback, useEffect, useState } from "react";
import {
  BEHANCE_PROFILE_URL,
  fetchBehanceProjects,
} from "../../utils/behanceProjects";
import BehanceEmbed from "../BehanceEmbed";
import XpLoadingShell from "../XpLoadingShell";

const EMBED_LOAD_TIMEOUT_MS = 15000;

function MyWorkApp() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [loadedEmbedIds, setLoadedEmbedIds] = useState(() => new Set());

  const markEmbedSettled = useCallback((projectId) => {
    setLoadedEmbedIds((current) => {
      if (current.has(projectId)) return current;
      const next = new Set(current);
      next.add(projectId);
      return next;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      setStatus("loading");
      setError("");
      setLoadedEmbedIds(new Set());

      try {
        const { projects: nextProjects } = await fetchBehanceProjects();
        if (cancelled) return;

        setProjects(nextProjects);
        setStatus(nextProjects.length ? "loading-embeds" : "empty");
      } catch (loadError) {
        if (cancelled) return;
        setProjects([]);
        setStatus("error");
        setError(loadError.message || "Could not load Behance projects.");
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "loading-embeds" || !projects.length) return undefined;

    if (loadedEmbedIds.size >= projects.length) {
      setStatus("ready");
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus("ready");
    }, EMBED_LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [status, projects, loadedEmbedIds]);

  const showLoader = status === "loading" || status === "loading-embeds";
  const loaderLabel =
    status === "loading"
      ? "Loading Behance projects..."
      : "Loading project previews...";

  return (
    <div className="my-work-app app-panel">
      <div className="xp-decorative-toolbar explorer-toolbar" aria-hidden="true">
        <span>Back</span>
        <span>Forward</span>
        <span>Up</span>
        <span>Search</span>
        <span>Folders</span>
      </div>

      <p className="services__addressbar">
        Address:{" "}
        <strong>C:\Documents and Settings\Davit\My Work\Behance</strong>
      </p>

      <div className="my-work-app__header">
        <p className="my-work-app__intro">
          Latest projects from my Behance portfolio.
        </p>
        <a
          className="my-work-app__profile-link"
          href={BEHANCE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open behance.net/dedgrl
        </a>
      </div>

      {status === "error" && (
        <p className="my-work-app__status my-work-app__status--error">{error}</p>
      )}

      {status === "empty" && (
        <p className="my-work-app__status">
          No published Behance projects yet. Check back soon - new work is on the way.
        </p>
      )}

      <div className="my-work-app__content">
        {showLoader && (
          <div className="my-work-app__loading">
            <XpLoadingShell label={loaderLabel} />
          </div>
        )}

        {projects.length > 0 && status !== "error" && (
          <div className="my-work-app__grid">
            {projects.map((project) => (
              <article key={project.id} className="my-work-app__card">
                <h3 className="my-work-app__title">{project.title}</h3>
                <BehanceEmbed
                  projectId={project.id}
                  title={project.title}
                  onLoad={() => markEmbedSettled(project.id)}
                  onError={() => markEmbedSettled(project.id)}
                />
                <a
                  className="my-work-app__project-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Behance
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyWorkApp;
