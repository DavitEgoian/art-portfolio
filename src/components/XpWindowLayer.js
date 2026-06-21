import { useWindows } from "../context/WindowContext";
import XpDesktopWindow from "./XpDesktopWindow";

function XpWindowLayer() {
  const { windows } = useWindows();

  const visibleWindows = [...windows]
    .filter((window) => !window.minimized)
    .sort((a, b) => a.zIndex - b.zIndex);

  return (
    <section className="xp-window-layer" aria-label="Open windows" aria-live="polite">
      {visibleWindows.map((window) => (
        <XpDesktopWindow key={window.instanceId} windowState={window} />
      ))}
    </section>
  );
}

export default XpWindowLayer;
