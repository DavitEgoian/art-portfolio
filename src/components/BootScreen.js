import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useSound } from "../context/SoundContext";
import { setBooted } from "../utils/storage";

const BOOT_LINES = [
  "Microsoft Windows XP",
  "Copyright © 1985-2001 Microsoft Corp.",
  "",
  "Loading personal settings...",
  "Preparing your creative workspace...",
];

function BootScreen({ onComplete }) {
  const { playSound } = useSound();
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setBooted();
      onComplete();
      return undefined;
    }

    playSound("startup");

    const progressTimer = window.setInterval(() => {
      setProgress((value) => Math.min(value + 4, 100));
    }, 90);

    const lineTimer = window.setInterval(() => {
      setLineIndex((index) => Math.min(index + 1, BOOT_LINES.length - 1));
    }, 650);

    const doneTimer = window.setTimeout(() => {
      setBooted();
      onComplete();
    }, 3200);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(lineTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete, playSound, reduceMotion]);

  const handleSkip = () => {
    setBooted();
    onComplete();
  };

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="xp-boot" role="dialog" aria-modal="true" aria-label="Windows is starting up">
      <div className="xp-boot__panel">
        <div className="xp-boot__logo" aria-hidden="true">
          <span>Windows</span>
          <strong>XP</strong>
        </div>
        <div className="xp-boot__progress" aria-hidden="true">
          <div className="xp-boot__blocks">
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className={progress > index * 8 ? "is-lit" : ""}
              />
            ))}
          </div>
        </div>
        <div className="xp-boot__text" aria-live="polite">
          {BOOT_LINES.slice(0, lineIndex + 1).map((line) => (
            <p key={line || "blank"}>{line || "\u00A0"}</p>
          ))}
        </div>
        <button type="button" className="xp-boot__skip" onClick={handleSkip}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default BootScreen;
