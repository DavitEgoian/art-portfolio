import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useSound } from "../context/SoundContext";
import {
  preloadDesktopAssets,
  waitForDesktopLayout,
} from "../utils/preloadAssets";
import { setBooted } from "../utils/storage";

const BOOT_LINES = [
  "Microsoft Windows XP",
  "Copyright © 1985-2001 Microsoft Corp.",
  "",
  "Loading personal settings...",
  "Preparing your creative workspace...",
];

const BOOT_MIN_MS = 3200;
const BOOT_MAX_MS = 10000;

function BootScreen({ onComplete }) {
  const { playSound } = useSound();
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const cancelledRef = useRef(false);
  const completedRef = useRef(false);
  const timersRef = useRef({});

  useEffect(() => {
    cancelledRef.current = false;
    completedRef.current = false;
    const assetsPromise = preloadDesktopAssets();
    const bootStartedAt = Date.now();

    const clearTimers = () => {
      window.clearInterval(timersRef.current.progress);
      window.clearInterval(timersRef.current.line);
      window.clearTimeout(timersRef.current.done);
      window.clearTimeout(timersRef.current.max);
    };

    const completeBoot = () => {
      if (completedRef.current || cancelledRef.current) return;
      completedRef.current = true;
      clearTimers();
      setBooted();
      onComplete();
    };

    const finishBoot = async (minDuration = BOOT_MIN_MS) => {
      const elapsed = Date.now() - bootStartedAt;
      const remaining = Math.max(0, minDuration - elapsed);

      if (remaining > 0) {
        await new Promise((resolve) => {
          timersRef.current.done = window.setTimeout(resolve, remaining);
        });
      }

      if (cancelledRef.current) return;

      await Promise.race([
        assetsPromise,
        new Promise((resolve) => {
          timersRef.current.max = window.setTimeout(resolve, BOOT_MAX_MS);
        }),
      ]);
      await waitForDesktopLayout();
      completeBoot();
    };

    if (reduceMotion) {
      finishBoot(0);
      return () => {
        cancelledRef.current = true;
        clearTimers();
      };
    }

    playSound("startup");

    timersRef.current.progress = window.setInterval(() => {
      setProgress((value) => Math.min(value + 4, 100));
    }, 90);

    timersRef.current.line = window.setInterval(() => {
      setLineIndex((index) => Math.min(index + 1, BOOT_LINES.length - 1));
    }, 650);

    finishBoot();

    return () => {
      cancelledRef.current = true;
      clearTimers();
    };
  }, [onComplete, playSound, reduceMotion]);

  const handleSkip = () => {
    window.clearInterval(timersRef.current.progress);
    window.clearInterval(timersRef.current.line);
    window.clearTimeout(timersRef.current.done);
    window.clearTimeout(timersRef.current.max);

    Promise.all([preloadDesktopAssets(), waitForDesktopLayout()]).then(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      setBooted();
      onComplete();
    });
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
