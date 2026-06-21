import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { isSoundMuted, setSoundMuted } from "../utils/storage";
import { playXpSound } from "../utils/xpSounds";

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(() => isSoundMuted());

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      setSoundMuted(next);
      if (!next) playXpSound("click", false);
      return next;
    });
  }, []);

  const playSound = useCallback(
    (name) => {
      playXpSound(name, muted);
    },
    [muted]
  );

  const value = useMemo(
    () => ({
      muted,
      toggleMute,
      playSound,
    }),
    [muted, toggleMute, playSound]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return context;
}
