import { DESKTOP_SHORTCUTS } from "../data/xpApps";

let desktopAssetsPromise = null;

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";

    const finish = () => resolve(src);

    image.onload = finish;
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      finish();
    }
  });
}

export function preloadDesktopAssets() {
  if (!desktopAssetsPromise) {
    const urls = new Set([
      `${process.env.PUBLIC_URL}/bliss.jpg`,
      ...DESKTOP_SHORTCUTS.map((shortcut) => shortcut.icon),
    ]);

    desktopAssetsPromise = Promise.all([...urls].map(preloadImage));
  }

  return desktopAssetsPromise;
}

export function waitForDesktopLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      document.querySelector(".xp-desktop__icons")?.getBoundingClientRect();
      requestAnimationFrame(resolve);
    });
  });
}
