import { useState } from "react";
import "./App.css";
import { SoundProvider } from "./context/SoundContext";
import { WindowProvider } from "./context/WindowContext";
import BootScreen from "./components/BootScreen";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import XpDesktop from "./components/XpDesktop";
import XpTaskbar from "./components/XpTaskbar";
import XpWindowLayer from "./components/XpWindowLayer";
import XpStartMenu from "./components/XpStartMenu";
import XpWallpaper from "./components/XpWallpaper";
import { hasBooted } from "./utils/storage";

function App() {
  const [booting, setBooting] = useState(() => !hasBooted());

  return (
    <SoundProvider>
      <WindowProvider>
        <a href="#xp-desktop" className="skip-link">
          Skip to desktop
        </a>
        {booting && <BootScreen onComplete={() => setBooting(false)} />}
        <div className="app xp-desktop-shell">
          <XpWallpaper />
          <XpDesktop />
          <XpWindowLayer />
          <XpStartMenu />
          <XpTaskbar />
        </div>
        <KeyboardShortcuts />
      </WindowProvider>
    </SoundProvider>
  );
}

export default App;
