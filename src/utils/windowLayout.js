const MOBILE_BREAKPOINT = 768;

export function isMobileViewport() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function getDesktopBounds() {
  const layer = document.querySelector(".xp-window-layer");
  const taskbarHeight =
    document.querySelector(".xp-taskbar")?.offsetHeight ?? 30;

  if (layer) {
    return {
      width: layer.clientWidth,
      height: layer.clientHeight,
      taskbarHeight,
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight - taskbarHeight,
    taskbarHeight,
  };
}

export function getMobileFullscreenLayout() {
  const { width: viewportWidth, height: viewportHeight } = getDesktopBounds();

  return {
    x: 0,
    y: 0,
    width: viewportWidth,
    height: viewportHeight,
  };
}

export function getInitialWindowLayout(app, openWindowCount = 0) {
  if (isMobileViewport()) {
    return getMobileFullscreenLayout();
  }

  const { width: viewportWidth, height: viewportHeight } = getDesktopBounds();
  const margin = 0;
  const maxWidth = viewportWidth - margin * 2;
  const maxHeight = viewportHeight - margin * 2;

  let width = Math.min(app.defaultSize.width, maxWidth);
  let height = Math.min(app.defaultSize.height, maxHeight);

  const cascade = openWindowCount * 18;
  const baseX = Math.min(app.defaultPosition.x, Math.max(0, viewportWidth - width));
  const baseY = Math.min(app.defaultPosition.y, Math.max(0, viewportHeight - height));

  const x = Math.max(margin, Math.min(baseX + cascade, viewportWidth - width));
  const y = Math.max(margin, Math.min(baseY + cascade, viewportHeight - height));

  return { x, y, width, height };
}

export function clampWindowPosition(x, y, width, height) {
  const { width: viewportWidth, height: viewportHeight } = getDesktopBounds();

  if (isMobileViewport()) {
    return { x: 0, y: 0 };
  }

  const minVisible = 48;

  return {
    x: Math.max(-width + minVisible, Math.min(x, viewportWidth - minVisible)),
    y: Math.max(0, Math.min(y, viewportHeight - minVisible)),
  };
}

export function clampWindowSize(width, height, x = 0, y = 0) {
  const { width: viewportWidth, height: viewportHeight } = getDesktopBounds();

  if (isMobileViewport()) {
    return {
      width: viewportWidth,
      height: viewportHeight,
    };
  }

  const minWidth = 300;
  const minHeight = 180;
  const maxWidth = Math.max(minWidth, viewportWidth - x - 8);
  const maxHeight = Math.max(minHeight, viewportHeight - y - 8);

  return {
    width: Math.max(minWidth, Math.min(width, maxWidth)),
    height: Math.max(minHeight, Math.min(height, maxHeight)),
  };
}
