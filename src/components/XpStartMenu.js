import { useCallback, useEffect, useRef } from "react";
import { useWindows } from "../context/WindowContext";
import { useSound } from "../context/SoundContext";
import { START_MENU_PROGRAMS } from "../data/xpApps";
import XpIcon, { XP_ICONS } from "../data/xpIcons";

function getLaunchOrigin(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

function XpStartMenu() {
  const {
    startMenuOpen,
    openApp,
    setStartMenuOpen,
    windows,
    closeWindow,
    minimizeWindow,
    resetWindowLayout,
  } = useWindows();
  const { playSound } = useSound();
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  const launchApp = useCallback(
    (appId, event) => {
      playSound("open");
      openApp(appId, { origin: getLaunchOrigin(event) });
    },
    [openApp, playSound]
  );

  const handleLogOff = () => {
    playSound("click");
    windows.forEach((window) => minimizeWindow(window.instanceId));
    setStartMenuOpen(false);
  };

  const handleShutDown = () => {
    playSound("close");
    windows.forEach((window) => closeWindow(window.instanceId));
    setStartMenuOpen(false);
  };

  const handleResetLayout = () => {
    playSound("click");
    resetWindowLayout();
    setStartMenuOpen(false);
  };

  useEffect(() => {
    if (!startMenuOpen) return undefined;

    const firstItem = itemRefs.current[0];
    firstItem?.focus();

    const handleKeyDown = (event) => {
      const items = itemRefs.current.filter(Boolean);
      const currentIndex = items.findIndex((item) => item === document.activeElement);

      if (event.key === "Escape") {
        event.preventDefault();
        setStartMenuOpen(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[next]?.focus();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const next = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[next]?.focus();
      }
    };

    const menu = menuRef.current;
    menu?.addEventListener("keydown", handleKeyDown);
    return () => menu?.removeEventListener("keydown", handleKeyDown);
  }, [setStartMenuOpen, startMenuOpen]);

  if (!startMenuOpen) return null;

  return (
    <>
      <button
        type="button"
        className="xp-startmenu-backdrop"
        aria-label="Close Start menu"
        onClick={() => setStartMenuOpen(false)}
      />
      <div
        id="xp-start-menu"
        ref={menuRef}
        className="xp-startmenu"
        role="menu"
        aria-label="Start menu"
      >
        <div className="xp-startmenu__header">
          <div className="xp-startmenu__userpic">
            <XpIcon src={XP_ICONS.myComputer} size={48} />
          </div>
          <strong className="xp-startmenu__username">Davit</strong>
        </div>

        <div className="xp-startmenu__body">
          <div className="xp-startmenu__programs">
            {START_MENU_PROGRAMS.map((item, index) => (
              <button
                key={`program-${item.appId}`}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                type="button"
                role="menuitem"
                className="xp-startmenu__item"
                onClick={(event) => launchApp(item.appId, event)}
              >
                <XpIcon src={item.icon} size={24} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="xp-startmenu__footer">
          <button
            type="button"
            className="xp-startmenu__footer-btn"
            onClick={handleResetLayout}
          >
            <XpIcon
              src={XP_ICONS.folder}
              size={22}
              className="xp-startmenu__footer-icon-img"
            />
            <span>Reset Windows</span>
          </button>
          <button
            type="button"
            className="xp-startmenu__footer-btn"
            onClick={handleLogOff}
          >
            <XpIcon
              src={XP_ICONS.logout}
              size={22}
              className="xp-startmenu__footer-icon-img"
            />
            <span>Log Off</span>
          </button>
          <button
            type="button"
            className="xp-startmenu__footer-btn"
            onClick={handleShutDown}
          >
            <XpIcon
              src={XP_ICONS.power}
              size={22}
              className="xp-startmenu__footer-icon-img"
            />
            <span>Turn Off Computer</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default XpStartMenu;
