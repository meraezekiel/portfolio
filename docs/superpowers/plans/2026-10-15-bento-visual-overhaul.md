# Bento Visual Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** Replace the robot and restyle the whole home page as a black + lime bento grid.
**Architecture:** Same CRA app and FILE_STRUCTURE.md conventions. Tokens as CSS variables on
`.portfolio-mode`; a shared `BentoTile` component gives every tile its look and hover spotlight.
**Spec:** `docs/superpowers/specs/2026-10-15-bento-visual-overhaul-design.md`

## Global Constraints
- Colours only via the spec's tokens; fonts Space Grotesk / Inter / JetBrains Mono.
- No 3D, no custom cursor, no `backdrop-filter` except the sticky header.
- Reduced motion: no reveal/spotlight animation.
- Phone width (≤ 700px): one column, no horizontal page scroll.
- Test command: `CI=true npx react-scripts test --watchAll=false <pattern>`.

## Review Focus
1. Availability `null` → tile absent, grid still balanced (Task 3 test).
2. Clipboard unavailable/denied → Copy falls back to `mailto:` (Task 6 test).
3. Latest-project tile opens the panel even when clicked while scrolled (hash nav → popstate) (Task 3 test + headless).
4. 1, 5 and 6 projects still produce a gap-free grid (Task 4 test).
5. Tab title / meta present in built HTML (Task 7 check).

---

### Task 1: Remove Spline + custom cursor, add tokens and fonts
- Uninstall `@splinetool/react-spline @splinetool/runtime` (`--legacy-peer-deps`).
- Delete: `HeroSection/.../handler/*` (tracking, visibility + test, role rotation), `utilities/DeviceCapability*`,
  `components/CustomCursor/`, `SPLINE_SCENES`, `WorkSection/.../handler/{useHorizontalScrollHandler,scrollPositionForCard*}`,
  `PortfolioHeader/.../resolveScrollTarget*`, `SkillsSection/.../MarqueeRow/`.
- `HomePage.scss`: tokens on `.portfolio-mode`, Inter body font, grid background, remove `cursor: none`.
- `public/index.html`: Google Fonts link, title, meta description.
- Constants: `availability`, `latestProject`, `resumeUrl: ''`, `MOBILE_DESKTOP_SKILLS`, `STACK_HIGHLIGHTS`.

### Task 2: `BentoTile` shared component
- `src/components/BentoTile/{index.js, implementation/BentoTile.jsx, BentoTileProps.js, useBentoTileHandler.js, BentoTile.scss, BentoTile.test.jsx}`.
- Props: `as='div'`, `className`, `accent` (lime variant), `glow` (lime outline + glow), `children`, rest spread.
- Spotlight: `onMouseMove` sets `--spot-x/--spot-y` on the element; `::before` radial glow at that point, hover-only.
- Test: renders `as` element with classes; mousemove sets the CSS variables.

### Task 3: Hero bento + header
- Rewrite `HeroSection.jsx/.scss/useHeroSectionHandler.js` per spec (tiles, buttons scroll via Lenis).
- Header: logo, nav, Hire me button; remove email link; restyle.
- Tests (`HeroSection.test.jsx`): availability tile shown when set and absent when `null`
  (via `jest.mock` of constants); latest tile `href="#work/<slug>"`.

### Task 4: Work bento grid
- `cardVariant.js` + test (totals 1, 4, 5, 6).
- `WorkSection` drops the pin/progress; `useWorkSectionHandler` reveals tiles; ProjectCard takes `variant`, built on `BentoTile`.
- CaseStudyPanel restyled with tokens. Existing tests stay green.

### Task 5: About + Skills tiles
- About: bio `BentoTile` + `StatsStrip` rendered as stat tiles.
- Skills: three `BentoTile`s with chips (Frontend / Backend / Mobile & desktop).

### Task 6: Contact bento + copy email
- `useContactSectionHandler` adds `copyEmail` (clipboard → "Copied!" 2s; failure → `window.location.href = mailto:`).
- Tests: success shows "Copied!"; rejection falls back to mailto.

### Task 7: Verify
- Full suite, `npm run build`, headless Chrome screenshots (desktop 1440×900, 1366×657, phone 390×844),
  canvases = 0, no overflow, no console errors, Latest tile opens panel. Final review, commit when asked.
