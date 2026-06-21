let audioContext = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioContext = new Ctx();
  }
  return audioContext;
}

function playTone({ frequency, duration, type = "square", gain = 0.04, when = 0 }) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + when);
  gainNode.gain.setValueAtTime(gain, ctx.currentTime + when);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + when + duration);
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start(ctx.currentTime + when);
  oscillator.stop(ctx.currentTime + when + duration + 0.02);
}

export function playXpSound(name, muted = false) {
  if (muted) return;

  switch (name) {
    case "startup":
      playTone({ frequency: 523, duration: 0.08, type: "triangle", gain: 0.05 });
      playTone({ frequency: 784, duration: 0.12, type: "triangle", gain: 0.045, when: 0.07 });
      playTone({ frequency: 1046, duration: 0.16, type: "triangle", gain: 0.04, when: 0.16 });
      break;
    case "click":
      playTone({ frequency: 880, duration: 0.03, type: "square", gain: 0.025 });
      break;
    case "open":
      playTone({ frequency: 660, duration: 0.05, type: "triangle", gain: 0.03 });
      playTone({ frequency: 990, duration: 0.07, type: "triangle", gain: 0.025, when: 0.04 });
      break;
    case "close":
      playTone({ frequency: 740, duration: 0.05, type: "triangle", gain: 0.03 });
      playTone({ frequency: 420, duration: 0.08, type: "triangle", gain: 0.025, when: 0.04 });
      break;
    case "menu":
      playTone({ frequency: 520, duration: 0.04, type: "square", gain: 0.02 });
      break;
    default:
      break;
  }
}
