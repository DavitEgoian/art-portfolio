import cardsData from "../../data/cardsData";

const FOLDER_ITEMS = cardsData.map((card, index) => ({
  ...card,
  folderLabel: `Folder (${index + 1} of ${cardsData.length})`,
}));

function ProjectsApp() {
  return (
    <div className="projects-app app-panel">
      <div className="xp-decorative-toolbar explorer-toolbar" aria-hidden="true">
        <span>Back</span>
        <span>Forward</span>
        <span>Up</span>
        <span>Search</span>
        <span>Folders</span>
      </div>
      <p className="services__addressbar">
        Address: <strong>C:\Documents and Settings\Davit\What I do</strong>
      </p>

      <div className="projects-app__grid">
        {FOLDER_ITEMS.map(({ icon, title, desc, folderLabel }) => (
          <article key={title} className="service-card xp-folder-item">
            <div className="service-card__icon-wrap">
              <img
                src={icon}
                alt=""
                width={40}
                height={40}
                decoding="async"
                className="service-card__icon"
              />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span className="service-card__index">{folderLabel}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ProjectsApp;
