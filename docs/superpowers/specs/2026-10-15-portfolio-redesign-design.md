# Portfolio redesign — work-first showcase

Date: 2026-10-15

## Goal

The portfolio is laggy, and the WORK section shows placeholder projects with no images. Make the
site smooth, make real projects the centrepiece, and make the scroll flow more interesting.

Success criteria:
- Scrolling stays smooth (no visible jank) on a normal laptop; measured before/after on a
  production build (frame rate while scrolling, JS transferred on first load).
- The WORK section shows the four real projects, each with screenshots and a case-study panel.
- Screenshots are added by dropping files into a folder — no code change needed.
- Works on phone width (no horizontal page scroll, vertical project list).

## Out of scope

- Running the four projects to capture screenshots (the user supplies them).
- Rewriting the unrelated legacy pages/components (`First`, `Second`, `Third`, `TestLayout`, …).
- Changing contact form behaviour.

## 1. Performance

| Cause | Fix |
|---|---|
| Three Spline runtimes (Hero, About, WhatIDo) rendering the same scene every frame | Keep Spline in the Hero only. Remove it from About and WhatIDo. |
| Hero scene keeps rendering when scrolled away | `IntersectionObserver` on the hero: unmount/stop the Spline app when off-screen (`spline.stop()` / `play()` where available), resume when visible. |
| Spline on weak devices | Skip Spline (render a static gradient/fallback) when `prefers-reduced-motion`, coarse pointer (touch), or `navigator.hardwareConcurrency <= 4`. |
| Cursor + head-tracking `requestAnimationFrame` loops run forever | Loops start on `mousemove` and stop once the value has settled (delta < 0.1px). Custom cursor not rendered on coarse pointers. |
| `backdrop-filter` on cards | Remove from SkillCard / ProjectCard (replaced with solid translucent backgrounds); keep only on the sticky header. |
| Lenis | Kept (drives ScrollTrigger), unchanged settings. |

Verification: `npm run build` before and after; compare main bundle size, and record scroll
frame rate in Chrome DevTools Performance on both builds.

## 2. Flow

1. **Hero** — name, rotating role, single 3D head, scroll hint.
2. **About** — bio (existing copy) + stats strip with count-up numbers on enter:
   `4+ years`, `4 featured projects`, `Web · Mobile · Desktop`.
3. **Work** — section pins (GSAP ScrollTrigger `pin` + horizontal `x` tween scrubbed to scroll)
   and project cards move sideways; a progress bar shows position. Each card: large cover
   screenshot, index number, title, one-line pitch, tags. Below 900px width the pin is disabled
   (ScrollTrigger `matchMedia`) and cards stack vertically.
4. **Case-study panel** — clicking a card opens a slide-in panel (right side on desktop, full
   screen on mobile): gallery of screenshots, problem, what I built, key features, stack, links.
   Closes on Esc, backdrop click, or browser Back (panel open pushes a `#work/<slug>` hash).
   Focus is moved into the panel and returned to the card on close; page scroll locked (Lenis
   `stop()`/`start()`) while open.
5. **Skills** — replaces the WhatIDo cards: two rows of infinite CSS marquee (frontend row,
   backend row moving opposite directions), paused on hover and under reduced motion.
6. **Contact** — unchanged except styling consistency.

## 3. Projects and screenshots

`PROJECTS` in `src/constants/portfolio.js` is replaced by these four (old EarthTracker,
Portfolio Site, Mobile Suite cards removed):

| slug | Title | Pitch | Stack |
|---|---|---|---|
| `posv2` | POSv2 | Offline-first point-of-sale for small Philippine businesses — products, split payments, VAT, end-of-day cash count. | Expo, React Native, TypeScript |
| `photo-studio` | Philmer ID Photo Studio | Windows app that turns any photo into print-ready ID photos: offline AI background removal, face alignment, 300 DPI print sheets, photo books. | Tauri, Rust, React, ONNX Runtime |
| `kalendario-studio` | Kalendaryo Studio | Drag-and-drop calendar designer with templates, photo frames, holidays, undo/redo and PNG/print export. | Next.js, TypeScript, Zustand, IndexedDB |
| `qr-code-generator` | QR Code Generator | Customizable QR code generator with live preview and download. Live on Vercel. | React, Vite, Tailwind, Supabase |

Each project entry has: `slug`, `title`, `pitch`, `problem`, `built`, `features[]`, `tags[]`,
`link` (QR only for now), `images[]`.

Screenshots live in `public/projects/<slug>/`. `images` lists the file names
(`['cover.png', '2.png', …]`); the first is the card cover. A missing image falls back to a
styled placeholder (`onError` swap), so the site works before screenshots arrive. The user
adds files and lists their names in `images`.

## Components (following FILE_STRUCTURE.md)

- `WorkSection` — rewritten: pin + horizontal track, progress bar, open/close state.
  - `ProjectCard` — updated props (`project`, `index`, `onOpen`), cover image with fallback.
  - `CaseStudyPanel` (new) — panel, gallery, focus/hash/scroll-lock handling in its handler.
- `AboutSection` — Spline removed, `StatsStrip` (new nested component) with count-up.
- `WhatIDoSection` — replaced by `SkillsMarquee` (new section); old `SkillCard` deleted.
- `HeroSection` — visibility pause + device gating for Spline; idle-stopping tracking loop.
- `CustomCursor` — idle-stopping loop, hidden on coarse pointer.
- `SPLINE_SCENES.about` / `whatIDo` removed.

## Testing

- `npm run build` succeeds with no new warnings.
- Manual run in the dev server at desktop and 375px width: hero loads, stats count up, work
  pins and scrolls sideways (desktop) / stacks (mobile), panel opens/closes via click, Esc,
  backdrop, Back; placeholders show when images are missing.
- Before/after build size + scroll performance numbers reported to the user.
