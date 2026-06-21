import recycleBinItems from "../../data/recycleBinItems";
import { XP_ICONS } from "../../data/xpIcons";

function RecycleBinApp() {
  return (
    <div className="recycle-bin-app app-panel">
      <div className="xp-decorative-toolbar recycle-bin-app__toolbar" aria-hidden="true">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
      </div>

      <div className="recycle-bin-app__content">
        <div className="recycle-bin-app__hero">
          <img src={XP_ICONS.recycleBin} alt="" width={72} height={72} draggable={false} />
          <div>
            <h2 className="recycle-bin-app__title">Recycle Bin</h2>
            <p className="recycle-bin-app__subtitle">
              {recycleBinItems.length} deleted item{recycleBinItems.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <ul className="recycle-bin-app__list">
          {recycleBinItems.map((item) => (
            <li key={item.name} className="recycle-bin-app__item">
              <div className="recycle-bin-app__item-main">
                <strong>{item.name}</strong>
                <span>{item.size}</span>
              </div>
              <p className="recycle-bin-app__item-note">{item.note}</p>
              <span className="recycle-bin-app__item-date">Deleted {item.deleted}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="xp-decorative-toolbar recycle-bin-app__statusbar" aria-hidden="true">
        {recycleBinItems.length} object(s)
      </div>
    </div>
  );
}

export default RecycleBinApp;
