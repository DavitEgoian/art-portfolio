import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useWindows } from "../context/WindowContext";
import { useSound } from "../context/SoundContext";
import { APP_IDS, DESKTOP_SHORTCUTS, XP_APPS } from "../data/xpApps";
import { loadDesktopOrder, saveDesktopOrder } from "../utils/storage";
import XpIcon from "../data/xpIcons";
import XpContextMenu from "./XpContextMenu";

const touchQuery = "(hover: none) and (pointer: coarse)";

function subscribeToTouchQuery(onStoreChange) {
  const media = window.matchMedia(touchQuery);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getTouchQuerySnapshot() {
  return window.matchMedia(touchQuery).matches;
}

function getIconLaunchOrigin(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

function XpDesktop() {
  const { selectedIcon, setSelectedIcon, openApp } = useWindows();
  const { playSound } = useSound();
  const [launchingIcon, setLaunchingIcon] = useState(null);
  const [iconOrder, setIconOrder] = useState(
    () => loadDesktopOrder() || DESKTOP_SHORTCUTS.map((shortcut) => shortcut.appId)
  );
  const [contextMenu, setContextMenu] = useState(null);
  const isTouchDevice = useSyncExternalStore(
    subscribeToTouchQuery,
    getTouchQuerySnapshot,
    () => false
  );

  const shortcuts = useMemo(
    () =>
      iconOrder
        .map((appId) => DESKTOP_SHORTCUTS.find((shortcut) => shortcut.appId === appId))
        .filter(Boolean),
    [iconOrder]
  );

  const launchApp = useCallback(
    (appId, event) => {
      const origin = event ? getIconLaunchOrigin(event) : null;
      setLaunchingIcon(appId);
      playSound("open");
      openApp(appId, { origin });
      window.setTimeout(() => setLaunchingIcon(null), 320);
    },
    [openApp, playSound]
  );

  const handleDesktopClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedIcon(null);
      setContextMenu(null);
    }
  };

  const handleKeyDown = (event, appId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      launchApp(appId, event);
    }
  };

  const handleIconClick = useCallback(
    (event, appId) => {
      event.stopPropagation();
      if (isTouchDevice) {
        launchApp(appId, event);
        return;
      }
      setSelectedIcon(appId);
    },
    [isTouchDevice, launchApp, setSelectedIcon]
  );

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const arrangeIcons = useCallback(() => {
    const sorted = [...iconOrder].sort((left, right) =>
      XP_APPS[left].label.localeCompare(XP_APPS[right].label)
    );
    setIconOrder(sorted);
    saveDesktopOrder(sorted);
    playSound("click");
  }, [iconOrder, playSound]);

  const contextMenuItems = useMemo(
    () => [
      {
        label: "Refresh",
        onSelect: () => window.location.reload(),
      },
      {
        label: "Arrange Icons",
        onSelect: arrangeIcons,
      },
      {
        label: "Properties",
        onSelect: () => openApp(APP_IDS.MY_COMPUTER),
      },
    ],
    [arrangeIcons, openApp]
  );

  useEffect(() => {
    if (!contextMenu) return undefined;
    const closeMenu = () => setContextMenu(null);
    window.addEventListener("scroll", closeMenu, true);
    return () => window.removeEventListener("scroll", closeMenu, true);
  }, [contextMenu]);

  return (
    <main
      id="xp-desktop"
      className="xp-desktop"
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      onKeyDown={(event) => {
        if (event.key === "Escape") setSelectedIcon(null);
      }}
      aria-label="Desktop"
    >
      <ul className="xp-desktop__icons">
        {shortcuts.map((shortcut) => {
          const isSelected = selectedIcon === shortcut.appId;
          const isLaunching = launchingIcon === shortcut.appId;

          return (
            <li key={shortcut.appId}>
              <button
                type="button"
                className={`xp-desktop__icon ${isSelected ? "is-selected" : ""} ${
                  isLaunching ? "is-launching" : ""
                }`}
                onClick={(event) => handleIconClick(event, shortcut.appId)}
                onDoubleClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  launchApp(shortcut.appId, event);
                }}
                onKeyDown={(event) => handleKeyDown(event, shortcut.appId)}
                aria-label={`Open ${shortcut.label}`}
                aria-current={isSelected ? "true" : undefined}
              >
                <XpIcon src={shortcut.icon} size={48} className="xp-desktop__icon-img" />
                <span>{shortcut.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {contextMenu && (
        <XpContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={() => setContextMenu(null)}
        />
      )}
    </main>
  );
}

export default XpDesktop;
