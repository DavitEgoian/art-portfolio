import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { XP_APPS } from "../data/xpApps";
import { loadWindowState, saveWindowState, clearWindowState } from "../utils/storage";
import {
  clampWindowPosition,
  clampWindowSize,
  getInitialWindowLayout,
} from "../utils/windowLayout";

const WindowContext = createContext(null);

function normalizeStoredWindows(storedWindows) {
  return storedWindows
    .filter((window) => XP_APPS[window.appId])
    .map((window) => ({
      instanceId: window.instanceId || window.appId,
      appId: window.appId,
      x: window.x ?? 0,
      y: window.y ?? 0,
      width: window.width ?? XP_APPS[window.appId].defaultSize.width,
      height: window.height ?? XP_APPS[window.appId].defaultSize.height,
      minimized: Boolean(window.minimized),
      maximized: Boolean(window.maximized),
      restoreBounds: window.restoreBounds || null,
      zIndex: 100,
      openOrigin: null,
    }));
}

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState(() => {
    const saved = loadWindowState();
    if (!saved?.windows?.length) return [];
    return normalizeStoredWindows(saved.windows);
  });
  const [focusedId, setFocusedId] = useState(() => loadWindowState()?.focusedId ?? null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const zIndexRef = useRef(
    windows.reduce((max, window) => Math.max(max, window.zIndex || 0), 100)
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      saveWindowState(windows, focusedId);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [windows, focusedId]);

  const focusWindow = useCallback((instanceId) => {
    zIndexRef.current += 1;
    setFocusedId(instanceId);
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId
          ? { ...window, zIndex: zIndexRef.current, minimized: false }
          : window
      )
    );
  }, []);

  const openApp = useCallback((appId, { origin } = {}) => {
    const app = XP_APPS[appId];
    if (!app) return;

    setStartMenuOpen(false);
    setSelectedIcon(appId);

    setWindows((prev) => {
      const existing = prev.find((window) => window.appId === appId);
      if (existing) {
        zIndexRef.current += 1;
        setFocusedId(existing.instanceId);
        return prev.map((window) =>
          window.appId === appId
            ? {
                ...window,
                minimized: false,
                zIndex: zIndexRef.current,
              }
            : window
        );
      }

      zIndexRef.current += 1;
      const instanceId = appId;
      const layout = getInitialWindowLayout(app, prev.length);
      const newWindow = {
        instanceId,
        appId,
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height,
        minimized: false,
        maximized: false,
        restoreBounds: null,
        zIndex: zIndexRef.current,
        openOrigin: origin ?? null,
      };
      setFocusedId(instanceId);
      return [...prev, newWindow];
    });
  }, []);

  const closeWindow = useCallback((instanceId) => {
    setWindows((prev) => prev.filter((window) => window.instanceId !== instanceId));
    setFocusedId((current) => (current === instanceId ? null : current));
  }, []);

  const minimizeWindow = useCallback((instanceId) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId ? { ...window, minimized: true } : window
      )
    );
    setFocusedId((current) => (current === instanceId ? null : current));
  }, []);

  const toggleMaximize = useCallback((instanceId) => {
    setWindows((prev) =>
      prev.map((window) => {
        if (window.instanceId !== instanceId) return window;

        if (window.maximized) {
          const restore = window.restoreBounds || {
            x: window.x,
            y: window.y,
            width: window.width,
            height: window.height,
          };
          return {
            ...window,
            maximized: false,
            x: restore.x,
            y: restore.y,
            width: restore.width,
            height: restore.height,
            restoreBounds: null,
          };
        }

        return {
          ...window,
          maximized: true,
          restoreBounds: {
            x: window.x,
            y: window.y,
            width: window.width,
            height: window.height,
          },
        };
      })
    );
    focusWindow(instanceId);
  }, [focusWindow]);

  const moveWindow = useCallback((instanceId, x, y) => {
    setWindows((prev) =>
      prev.map((window) => {
        if (window.instanceId !== instanceId) return window;
        const clamped = clampWindowPosition(x, y, window.width, window.height);
        return {
          ...window,
          x: clamped.x,
          y: clamped.y,
          maximized: false,
          restoreBounds: null,
        };
      })
    );
  }, []);

  const resizeWindow = useCallback((instanceId, width, height) => {
    setWindows((prev) =>
      prev.map((window) => {
        if (window.instanceId !== instanceId || window.maximized) return window;
        const clamped = clampWindowSize(width, height, window.x, window.y);
        const position = clampWindowPosition(
          window.x,
          window.y,
          clamped.width,
          clamped.height
        );
        return {
          ...window,
          width: clamped.width,
          height: clamped.height,
          x: position.x,
          y: position.y,
          restoreBounds: null,
        };
      })
    );
  }, []);

  const cycleWindow = useCallback((direction = 1) => {
    setWindows((prev) => {
      const visible = prev.filter((window) => !window.minimized);
      if (!visible.length) return prev;

      const currentIndex = visible.findIndex((window) => window.instanceId === focusedId);
      const nextIndex =
        currentIndex === -1
          ? 0
          : (currentIndex + direction + visible.length) % visible.length;
      const nextWindow = visible[nextIndex];
      zIndexRef.current += 1;
      setFocusedId(nextWindow.instanceId);

      return prev.map((window) =>
        window.instanceId === nextWindow.instanceId
          ? { ...window, zIndex: zIndexRef.current, minimized: false }
          : window
      );
    });
  }, [focusedId]);

  const clearOpenOrigin = useCallback((instanceId) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId ? { ...window, openOrigin: null } : window
      )
    );
  }, []);

  const resetWindowLayout = useCallback(() => {
    setWindows((prev) =>
      prev.map((window, index) => {
        const app = XP_APPS[window.appId];
        const layout = getInitialWindowLayout(app, index);
        return {
          ...window,
          x: layout.x,
          y: layout.y,
          width: layout.width,
          height: layout.height,
          minimized: false,
          maximized: false,
          restoreBounds: null,
          openOrigin: null,
        };
      })
    );
    clearWindowState();
  }, []);

  const toggleStartMenu = useCallback(() => {
    setStartMenuOpen((open) => !open);
  }, []);

  const value = useMemo(
    () => ({
      windows,
      focusedId,
      selectedIcon,
      startMenuOpen,
      openApp,
      closeWindow,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      moveWindow,
      resizeWindow,
      cycleWindow,
      clearOpenOrigin,
      resetWindowLayout,
      setSelectedIcon,
      toggleStartMenu,
      setStartMenuOpen,
    }),
    [
      windows,
      focusedId,
      selectedIcon,
      startMenuOpen,
      openApp,
      closeWindow,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      moveWindow,
      resizeWindow,
      cycleWindow,
      clearOpenOrigin,
      resetWindowLayout,
      toggleStartMenu,
    ]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindows must be used within WindowProvider");
  }
  return context;
}
