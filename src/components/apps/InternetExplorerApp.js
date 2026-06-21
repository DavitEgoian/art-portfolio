import educationTimeline from "../../data/educationTimeline";
import { getOrganizationLogo } from "../../data/organizationLogos";
import XpIcon, { XP_ICONS } from "../../data/xpIcons";

const IE_TOOLBAR_ITEMS = [
  { icon: XP_ICONS.ieRefresh, label: "Refresh" },
  { icon: XP_ICONS.ieHome, label: "Home" },
  { icon: XP_ICONS.ieSearch, label: "Search" },
  { icon: XP_ICONS.ieFavorites, label: "Favorites" },
];

function OrgLogo({ organization }) {
  const src = getOrganizationLogo(organization);
  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      width={36}
      height={36}
      className="journey__org-logo"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

function InternetExplorerApp() {
  return (
    <div className="ie-app app-panel">
      <div className="xp-decorative-toolbar explorer-toolbar" aria-hidden="true">
        <span>← Back</span>
        <span>→ Forward</span>
        {IE_TOOLBAR_ITEMS.map(({ icon, label }) => (
          <span key={label} className="journey__toolbar-item">
            <XpIcon src={icon} size={16} className="journey__toolbar-icon" />
            {label}
          </span>
        ))}
      </div>
      <div className="ie-app__content">
        <div className="journey__group">
          <h3 className="journey__group-label">📁 Education</h3>
          <div className="journey__stream">
            {educationTimeline.map(({ title, highlighted, desc, date, link, linkLabel }) => (
              <article key={`${title}-${date}`} className="journey__item">
                <div className="journey__content">
                  <time className="journey__date">{date}</time>
                  <h4 className="journey__heading">
                    <OrgLogo organization={title} />
                    <span>{title}</span>
                  </h4>
                  <p>
                    <span className="journey__org-line">
                      <span className="journey__highlight">{highlighted}</span>
                    </span>
                    {desc}
                  </p>
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {linkLabel || "Learn more"}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternetExplorerApp;
