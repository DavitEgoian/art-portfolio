const WINDOW_STATE_KEY = "xp-window-state";
const BOOT_KEY = "xp-boot-complete";
const SOUND_MUTED_KEY = "xp-sounds-muted";
const DESKTOP_ORDER_KEY = "xp-desktop-order";

export function hasBooted() {
  try {
    return localStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return true;
  }
}

export function setBooted() {
  try {
    localStorage.setItem(BOOT_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function isSoundMuted() {
  try {
    return localStorage.getItem(SOUND_MUTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSoundMuted(muted) {
  try {
    localStorage.setItem(SOUND_MUTED_KEY, muted ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function loadWindowState() {
  try {
    const raw = localStorage.getItem(WINDOW_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.windows)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearWindowState() {
  try {
    localStorage.removeItem(WINDOW_STATE_KEY);
  } catch {
    /* ignore */
  }
}

export function saveWindowState(windows, focusedId) {
  try {
    const payload = {
      windows: windows.map(
        ({ instanceId, appId, x, y, width, height, minimized, maximized, restoreBounds }) => ({
          instanceId,
          appId,
          x,
          y,
          width,
          height,
          minimized: Boolean(minimized),
          maximized: Boolean(maximized),
          restoreBounds: restoreBounds || null,
        })
      ),
      focusedId,
    };
    localStorage.setItem(WINDOW_STATE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function loadDesktopOrder() {
  try {
    const raw = localStorage.getItem(DESKTOP_ORDER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveDesktopOrder(order) {
  try {
    localStorage.setItem(DESKTOP_ORDER_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}
