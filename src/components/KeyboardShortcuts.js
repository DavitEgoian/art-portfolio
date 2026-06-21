import { useEffect } from "react";
import { useWindows } from "../context/WindowContext";
import { useSound } from "../context/SoundContext";

function KeyboardShortcuts() {
  const {
    windows,
    focusedId,
    startMenuOpen,
    setStartMenuOpen,
    closeWindow,
    cycleWindow,
  } = useWindows();
  const { playSound } = useSound();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "Tab") {
        event.preventDefault();
        cycleWindow(event.shiftKey ? -1 : 1);
        return;
      }

      if (event.key !== "Escape") return;

      if (startMenuOpen) {
        event.preventDefault();
        setStartMenuOpen(false);
        return;
      }

      if (focusedId) {
        event.preventDefault();
        playSound("close");
        closeWindow(focusedId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    closeWindow,
    cycleWindow,
    focusedId,
    playSound,
    setStartMenuOpen,
    startMenuOpen,
    windows,
  ]);

  return null;
}

export default KeyboardShortcuts;
