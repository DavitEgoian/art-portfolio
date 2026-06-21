const ICON_BASE = `${process.env.PUBLIC_URL}/xp-icons`;

export const XP_ICONS = {
  myComputer: `${ICON_BASE}/my-computer.png`,
  myDocuments: `${ICON_BASE}/my-documents.png`,
  myWork: `${ICON_BASE}/my-work.png`,
  folder: `${ICON_BASE}/folder.png`,
  controlPanel: `${ICON_BASE}/control-panel.png`,
  internetExplorer: `${ICON_BASE}/internet-explorer.png`,
  msnMessenger: `${ICON_BASE}/msn-messenger.png`,
  recycleBin: `${ICON_BASE}/recycle-bin.png`,
  notepad: `${ICON_BASE}/notepad.png`,
  applicationWindow: `${ICON_BASE}/application-window.png`,
  startLogo: `${ICON_BASE}/start-logo.ico`,
  mapNetwork: `${ICON_BASE}/map-network.png`,
  floppyDisk: `${ICON_BASE}/floppy-disk.png`,
  ieRefresh: `${ICON_BASE}/ie-refresh.png`,
  ieHome: `${ICON_BASE}/ie-home.png`,
  ieSearch: `${ICON_BASE}/ie-search.png`,
  ieFavorites: `${ICON_BASE}/ie-favorites.png`,
  windowsFlag: `${ICON_BASE}/windows-flag.png`,
  logout: `${ICON_BASE}/logout.png`,
  power: `${ICON_BASE}/power.png`,
};

function XpIcon({ src, size = 32, className = "" }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`xp-icon ${className}`.trim()}
      draggable={false}
    />
  );
}

export default XpIcon;
