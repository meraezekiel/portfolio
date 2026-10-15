# Visual overhaul — black + lime bento

Date: 2026-10-15 · Builds on `2026-10-15-portfolio-redesign-design.md` (project data, case-study
panel, hash routing, screenshot folders all stay).

## Goal

Remove the animated 3D robot and give the whole site a new look: a **bento-grid** layout in a
**near-black + lime** palette, for an audience of recruiters and freelance clients equally —
credible and scannable, with a few tasteful interactive touches.

Approved in the visual companion: style D (bento), palette 2 (black + lime), work layout B
(bento project grid), and the full-page flow mockup (`.superpowers/brainstorm/.../full-page.html`).

## Design tokens

Defined once as CSS custom properties on `.portfolio-mode` (HomePage.scss):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#09090b` | page |
| `--tile` | `#111113` | tile background |
| `--tile-2` | `#18181b` | chips, inputs |
| `--line` | `rgba(255,255,255,.08)` | borders, grid |
| `--text` | `#fafafa` | headings |
| `--muted` | `#a1a1aa` | body |
| `--dim` | `#71717a` | captions |
| `--lime` | `#a3e635` | accent, primary buttons |
| `--lime-soft` | `rgba(163,230,53,.1)` | accent backgrounds |
| `--lime-text` | `#bef264` | accent text on dark |

Fonts (Google Fonts in `public/index.html`): **Space Grotesk** (headings, numbers), **Inter**
(body), **JetBrains Mono** (small labels like `// FULL-STACK DEVELOPER`). Page background has a
faint 32px grid that fades out down the hero.

## Flow

1. **Header** — sticky, `JA` logo, About / Work / Skills / Contact, lime **Hire me** button
   (scrolls to Contact). Email link removed from the header (it lives in Contact).
2. **Hero bento** (3 columns, 2 rows; one column on phones):
   - Intro tile (spans 2 rows): mono label, "Hi, I'm John. I build apps that ship.", one-line
     pitch, buttons **View my work** (→ #work) and **Get in touch** (→ #contact).
   - `4+` years tile.
   - Availability tile (lime): `PORTFOLIO_CONFIG.availability = { label, detail }`; `null` hides it.
   - Latest project tile: links to `#work/<slug>` (opens that case study). Slug from
     `PORTFOLIO_CONFIG.latestProject`.
   - Stack tile: chips.
3. **About** — bio tile (wide) + the three count-up stat tiles (existing `STATS`).
4. **Selected work** — bento project grid, normal vertical scroll (horizontal pin removed).
   6-column grid; card variants from a pure `cardVariant(index, total)`:
   first = `featured` (4 cols × 2 rows), next two = `small` (2 cols), and the remaining cards fill
   rows of three `small`s, except a final row of 1 → `wide` (6 cols, horizontal layout) and a final
   row of 2 → `half` (3 cols each). With today's 4 projects: featured, small, small, wide.
   Phones: one column. Clicking still opens the case-study panel (restyled to the new tokens).
5. **What I do** — three tiles: Frontend, Backend, Mobile & desktop (chips). Replaces the marquee.
6. **Contact** — big tile "Have a project in mind?" + email with a **Copy** button (shows
   "Copied!" for 2s; falls back to `mailto:` if the clipboard API fails) + links tile (GitHub,
   Résumé only if `resumeUrl` is set, Email). Footer kept.

## Motion

- Tiles fade up with a short stagger when they enter the viewport (GSAP, existing pattern);
  disabled under `prefers-reduced-motion`.
- Hover spotlight: a soft lime radial glow that follows the cursor inside a tile (CSS variables
  set on `mousemove`, no rAF loop); hover-capable pointers only.
- Stats count-up kept. Lenis smooth scroll kept.

## Removed

- Spline 3D robot: `@splinetool/react-spline` + `@splinetool/runtime` uninstalled,
  `SPLINE_SCENES`, cursor-tracking + visibility handlers, `DeviceCapability` util.
- Custom cursor component (normal pointer everywhere).
- Rotating role/glitch text, scroll hint, horizontal pinned gallery (+ `scrollPositionForCard`,
  `resolveScrollTarget` which only served the pin), skills marquee.

## Content defaults (user can change in `src/constants/portfolio.js`)

- Availability: "Open to work · Freelance projects & full-time roles" (shown in the approved
  mockup; set `availability: null` to hide).
- Résumé: hidden — `public/resume.pdf` does not exist; set `resumeUrl` once added.
- Browser tab title: "John Antoque — Full-Stack Developer", plus a meta description.

## Testing

- Unit: `cardVariant` (4, 1, 5, 6 projects), Contact copy button (success + fallback), hero
  renders availability only when set and links the latest project to `#work/<slug>`, route
  handler opens a panel on `hashchange`-style navigation (popstate) — existing test covers it.
- Existing tests for ProjectImage, CaseStudyPanel, route handler, lenisInstance, StatsStrip stay green.
- Build compiles; headless Chrome: no canvases, screenshots desktop + 390px, no horizontal
  overflow, no console errors, case-study opens from the Latest-project tile.
