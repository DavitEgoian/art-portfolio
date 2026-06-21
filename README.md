# Portfolio Website

A Windows XP–themed creative portfolio for [Davit Egoian](https://davitegoian.tech). The site recreates the classic Bliss desktop experience—taskbar, Start menu, draggable windows, and desktop shortcuts—while presenting brand strategy, projects, experience, and contact details inside familiar XP-style applications.

**Live site:** [https://davitegoian.tech](https://davitegoian.tech)

## Features

### Windows XP desktop

- Bliss wallpaper, Luna-style taskbar, Start menu, and skippable XP boot screen on first visit
- Eight desktop shortcuts that open portfolio content as floating windows
- Draggable, resizable, minimizable, and maximizable windows with layout persistence
- Keyboard shortcuts: `Esc` close menu/window, `Alt+Tab` cycle windows
- Right-click desktop menu (Refresh, Arrange Icons, Properties)
- Subtle XP UI sounds with taskbar mute toggle
- Recycle Bin easter egg with deleted “old portfolio” files
- Zoom-from-icon open animation powered by Framer Motion
- Windows XP favicon (`public/favicon.ico`)

### Portfolio apps

| Shortcut | Window | Content |
|----------|--------|---------|
| **My Computer** | Welcome / hero | Introduction and creative positioning |
| **My Documents** | Notepad | About bio |
| **What I do** | Explorer | Project folders and creative focus areas |
| **Control Panel** | Toolkit | Creative tools and skills |
| **Internet Explorer** | Favorites | Education timeline |
| **MSN Messenger** | Messenger | Social links and contact |
| **My Work** | Behance | Published creative projects |
| **Recycle Bin** | Recycle Bin | Easter-egg deleted files |

### Mobile and accessibility

- Responsive desktop icons that scale and reflow on short or narrow screens
- Touch-friendly window dragging and single-tap icon launch on mobile
- Floating windows (not forced full-screen) with larger control buttons on small viewports
- Respects `prefers-reduced-motion` for animations

## Tech stack

- **React 19** — UI framework
- **Create React App** (`react-scripts`) — build tooling
- **Framer Motion** — window open animations
- **GSAP** — hero entrance animations
- **CSS custom properties** — XP Luna theme tokens and responsive layout
- **gh-pages** — deployment to GitHub Pages

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ recommended
- npm

### Install and run

```bash
git clone https://github.com/DavitEgoian/Portfolio-Website.git
cd Portfolio-Website
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

Output is written to the `build/` folder.

### Deploy

The project is configured for GitHub Pages with homepage `https://davitegoian.tech`:

```bash
npm run deploy
```

This runs `npm run build` then publishes `build/` via `gh-pages`. Ensure `public/CNAME` contains your custom domain if you use one.

## Project structure

```
portfolio-website/
├── public/
│   ├── bliss.jpg              # XP Bliss wallpaper
│   ├── xp-icons/              # Desktop and UI icons
│   ├── org-logos/             # Organization logos for timelines
│   ├── index.html
│   ├── manifest.json
│   └── CNAME
├── patches/
│   └── react-scripts+5.0.1.patch   # Dev server compatibility patch
├── src/
│   ├── components/
│   │   ├── apps/              # Portfolio content inside XP windows
│   │   ├── xp/                # Reusable XP window chrome
│   │   ├── XpDesktop.js       # Desktop icons
│   │   ├── XpDesktopWindow.js # Draggable window wrapper
│   │   ├── XpStartMenu.js     # Start menu
│   │   ├── XpTaskbar.js       # Taskbar and clock
│   │   └── XpWindowLayer.js   # Window stacking layer
│   ├── context/
│   │   └── WindowContext.js   # Window state (open, focus, drag, etc.)
│   ├── data/
│   │   ├── xpApps.js          # App registry and Start menu config
│   │   ├── xpIcons.js         # Icon paths and XpIcon component
│   │   ├── cardsData.js       # Project / skill cards
│   │   ├── educationTimeline.js
│   │   ├── socialLogos.js
│   │   └── techLogos.js
│   ├── utils/
│   │   └── windowLayout.js    # Initial window size/position helpers
│   ├── App.js
│   └── App.css                # Global XP theme styles
├── package.json
└── README.md
```

## Customization

### Content

Edit the data files under `src/data/`:

- **`xpApps.js`** — window titles, default positions/sizes, Start menu sections
- **`cardsData.js`** — “What I do” project cards
- **`educationTimeline.js`** — Internet Explorer education favorites
- **`socialLogos.js`** — Messenger / social links
- **`techLogos.js`** — technology logos (if used in apps)

### App panels

Each portfolio section lives in `src/components/apps/`. Update the matching component to change layout or copy for that window.

### Theme

XP colors and spacing are defined as CSS variables at the top of `src/App.css` (for example `--xp-taskbar-height`, `--xp-selection`, `--xp-window-bg`).

### Environment variables

Copy `.env.example` to `.env.local` if you want Behance API sync during development or build:

- `REACT_APP_BEHANCE_API_KEY` — optional Behance API key for richer project metadata
- `REACT_APP_BEHANCE_USERNAME` — Behance username (defaults to `dedgrl`)

Behance sync runs before `npm start` and `npm run build`. If sync fails, the build keeps the existing `public/behance-projects.json` when available.

### Icons and assets

- Replace or add icons in `public/xp-icons/`
- Update paths in `src/data/xpIcons.js`
- Swap `public/bliss.jpg` for a different wallpaper

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server |
| `npm run build` | Production build |
| `npm test` | Run tests (Jest / Testing Library) |
| `npm run deploy` | Build and publish to GitHub Pages |
| `npm run eject` | Eject from Create React App (irreversible) |

`postinstall` runs `patch-package` to apply the `react-scripts` dev-server patch in `patches/`.

## License

MIT License
