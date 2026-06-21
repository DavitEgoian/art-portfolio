const MOBILE_BREAKPOINT = 768;

export function isMobileViewport() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function getDesktopBounds() {
  const taskbarHeight =
    document.querySelector(".xp-taskbar")?.offsetHeight ?? 30;

  return {
    width: window.innerWidth,
    height: window.innerHeight - taskbarHeight,
    taskbarHeight,
  };
}

export function getInitialWindowLayout(app, openWindowCount = 0) {
  const { width: viewportWidth, height: viewportHeight } = getDesktopBounds();
  const mobile = isMobileViewport();
  const margin = mobile ? 12 : 0;
  const maxWidth = viewportWidth - margin * 2;
  const maxHeight = viewportHeight - margin * 2;

  let width = Math.min(app.defaultSize.width, maxWidth);
  let height = Math.min(app.defaultSize.height, maxHeight);

  if (mobile) {
    width = Math.min(width, maxWidth);
    height = Math.min(height, Math.max(260, maxHeight * 0.72));
  }

  const cascade = openWindowCount * 18;
  const baseX = mobile
    ? (viewportWidth - width) / 2
    : Math.min(app.defaultPosition.x, Math.max(0, viewportWidth - width));
  const baseY = mobile
    ? viewportHeight * 0.12
    : Math.min(app.defaultPosition.y, Math.max(0, viewportHeight - height));

  const x = Math.max(margin, Math.min(baseX + cascade, viewportWidth - width));
  const y = Math.max(margin, Math.min(baseY + cascade, viewportHeight - height));

  return { x, y, width, height };
}

export function clampWindowPosition(x, y, width, height) {
  const { width: viewportWidth, height: viewportHeight } = getDesktopBounds();
  const minVisible = 48;

  return {
    x: Math.max(-width + minVisible, Math.min(x, viewportWidth - minVisible)),
    y: Math.max(0, Math.min(y, viewportHeight - minVisible)),
  };
}

export function clampWindowSize(width, height, x = 0, y = 0) {
  const { width: viewportWidth, height: viewportHeight } = getDesktopBounds();
  const minWidth = 300;
  const minHeight = 180;
  const maxWidth = Math.max(minWidth, viewportWidth - x - 8);
  const maxHeight = Math.max(minHeight, viewportHeight - y - 8);

  return {
    width: Math.max(minWidth, Math.min(width, maxWidth)),
    height: Math.max(minHeight, Math.min(height, maxHeight)),
  };
}
