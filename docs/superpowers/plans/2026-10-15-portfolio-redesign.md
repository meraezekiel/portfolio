# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio smooth and work-first: one paused-when-hidden 3D scene, a pinned horizontal project gallery with case-study panels, stats, and a skills marquee.

**Architecture:** CRA (react-scripts 5) single page. Sections live in `src/pages/HomePage/implementation/<Section>/` following `FILE_STRUCTURE.md` (component file + `use<Name>Handler.js` + optional `/handler` + nested components). GSAP ScrollTrigger drives scroll animation on top of Lenis smooth scroll. Project data is static in `src/constants/portfolio.js`; screenshots are static files in `public/projects/<slug>/`.

**Tech Stack:** React 18, GSAP 3.15 (ScrollTrigger, matchMedia), Lenis 1.3, @splinetool/react-spline 4, SCSS, Jest + @testing-library/react 13 (via `react-scripts test`).

**Spec:** `docs/superpowers/specs/2026-10-15-portfolio-redesign-design.md`

## Global Constraints

- Follow `FILE_STRUCTURE.md`: one component per `.jsx`, `index.js` re-exports `./implementation/<Name>`, logic in `use<Name>Handler.js`, props typedef in `<Name>Props.js` when the component takes props.
- Plain JavaScript (`.js`/`.jsx`), SCSS, BEM class names (`block__element--modifier`), existing palette: bg `#050a1f`, teal `#5eead4`, violet `#b794f6`, text `#e2e8f0`, muted `#94a3b8`.
- No `backdrop-filter` except on the sticky header.
- Spline only in the hero; never on reduced motion, coarse pointer, or `hardwareConcurrency <= 4`.
- Horizontal pin only at `min-width: 900px` and `prefers-reduced-motion: no-preference`.
- Missing screenshots must render a placeholder, never a broken image.
- Tests import leaf modules directly (never a barrel that pulls in `lenis`, which is ESM-only and breaks Jest).
- Test command: `CI=true npx react-scripts test --watchAll=false <pattern>`.

## Review Focus

1. A project with zero images or a misspelled file name → placeholder, no broken image icon (Task 2 test: `onError` swaps to placeholder; `file` undefined renders placeholder).
2. Landing directly on `/#work/<slug>` (shared link) → that panel opens; unknown slug → nothing opens (Task 4 tests).
3. Pressing Esc / Back while the panel is closed → nothing happens, no history entry is popped (Task 3 test: Esc while closed does not call `onClose`; Task 4: close without a pushed entry uses `replaceState`).
4. Scrolling inside the open panel → panel scrolls, page does not (panel has `data-lenis-prevent`; Task 3 test asserts the attribute).
5. Hero off-screen → Spline app stopped, resumed when back (Task 5 test with a mocked `IntersectionObserver`).

---

### Task 1: Project data, helpers, test setup

**Files:**
- Create: `src/setupTests.js`
- Create: `src/utilities/ProjectImage.js`, `src/utilities/ProjectImage.test.js`
- Create: `src/utilities/DeviceCapability.js`, `src/utilities/DeviceCapability.test.js`
- Modify: `src/constants/portfolio.js` (replace `PROJECTS`, add `STATS`, add SKILLS nav link)
- Create: `public/projects/{posv2,photo-studio,kalendario-studio,qr-code-generator}/.gitkeep`

**Interfaces:**
- Produces: `projectImageSrc(slug: string, file: string): string`; `shouldRenderSpline({reducedMotion: boolean, coarsePointer: boolean, cores?: number}): boolean`; `readDeviceCapability(): {reducedMotion, coarsePointer, cores}`; `PROJECTS: Array<{slug, title, pitch, problem, built, features: string[], tags: string[], link: string, images: string[]}>`; `STATS: Array<{value: string, label: string}>`.

- [ ] **Step 1: Write failing tests**

`src/setupTests.js`:
```js
import '@testing-library/jest-dom';
```

`src/utilities/ProjectImage.test.js`:
```js
import { projectImageSrc } from './ProjectImage';

test('builds a public path for a project screenshot', () => {
  expect(projectImageSrc('posv2', 'cover.png')).toBe('/projects/posv2/cover.png');
});

test('encodes file names with spaces', () => {
  expect(projectImageSrc('posv2', 'my shot.png')).toBe('/projects/posv2/my%20shot.png');
});
```

`src/utilities/DeviceCapability.test.js`:
```js
import { shouldRenderSpline } from './DeviceCapability';

const capable = { reducedMotion: false, coarsePointer: false, cores: 8 };

test('renders on a capable desktop', () => {
  expect(shouldRenderSpline(capable)).toBe(true);
});

test('skips on reduced motion', () => {
  expect(shouldRenderSpline({ ...capable, reducedMotion: true })).toBe(false);
});

test('skips on touch devices', () => {
  expect(shouldRenderSpline({ ...capable, coarsePointer: true })).toBe(false);
});

test('skips on 4 cores or fewer', () => {
  expect(shouldRenderSpline({ ...capable, cores: 4 })).toBe(false);
});

test('renders when core count is unknown', () => {
  expect(shouldRenderSpline({ ...capable, cores: undefined })).toBe(true);
});
```

- [ ] **Step 2: Run to verify failure** — `CI=true npx react-scripts test --watchAll=false utilities` → FAIL (modules not found).

- [ ] **Step 3: Implement**

`src/utilities/ProjectImage.js`:
```js
export const projectImageSrc = (slug, file) =>
  `${process.env.PUBLIC_URL || ''}/projects/${slug}/${encodeURIComponent(file)}`;
```

`src/utilities/DeviceCapability.js`:
```js
export const shouldRenderSpline = ({ reducedMotion, coarsePointer, cores }) =>
  !reducedMotion && !coarsePointer && !(typeof cores === 'number' && cores <= 4);

export const readDeviceCapability = () => ({
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  coarsePointer: window.matchMedia('(pointer: coarse)').matches,
  cores: navigator.hardwareConcurrency,
});
```

`src/constants/portfolio.js`: add `{ id: 'skills', label: 'SKILLS' }` to `NAV_LINKS` after `work`; add `STATS`; replace `PROJECTS` with the four projects below, preceded by a comment explaining how to add screenshots.
```js
export const STATS = [
  { value: '4+', label: 'Years building production apps' },
  { value: '4', label: 'Featured projects' },
  { value: '3', label: 'Platforms: web, mobile, desktop' },
];

// SCREENSHOTS: put image files in public/projects/<slug>/ and list their file names in
// `images`. The first one is the card cover. Missing files show a placeholder.
export const PROJECTS = [
  {
    slug: 'posv2',
    title: 'POSv2',
    pitch: 'Offline-first point-of-sale for small Philippine businesses.',
    problem: 'Small shops need a till that keeps working without internet, gets VAT right, and runs on an inexpensive Android phone or tablet.',
    built: "A React Native app built with Expo that keeps the whole store on the device — products, stock, sales history, users and the day's cash count — with PIN sign-in and backup and restore.",
    features: [
      'Guided store setup with logo, VAT and owner PIN',
      'Product catalog with photos, categories and stock',
      'Split payments, held sales and sale numbering',
      'End-of-day cash count and closing',
      'Everything persists on the device — no server needed',
    ],
    tags: ['Expo', 'React Native', 'TypeScript'],
    link: '',
    images: ['cover.png'],
  },
  {
    slug: 'photo-studio',
    title: 'Philmer ID Photo Studio',
    pitch: 'Turns any photo into print-ready ID photos — fully offline.',
    problem: "Photo shops spend time hand-cutting backgrounds and laying out ID sizes, and online tools upload customers' photos to someone else's server.",
    built: "A Windows desktop app with a React interface and a Rust core that removes backgrounds with AI on the machine itself, at the photo's original resolution, then aligns the face and prints true 300 DPI sheets.",
    features: [
      'Offline AI background removal (ONNX Runtime)',
      'Automatic face alignment and ID size presets',
      'Print sheets at true 300 DPI',
      'Photo Book: auto-laid-out pages with cut marks',
      'Photo Print mode for regular prints',
    ],
    tags: ['Tauri', 'Rust', 'React', 'ONNX Runtime'],
    link: '',
    images: ['cover.png'],
  },
  {
    slug: 'kalendario-studio',
    title: 'Kalendaryo Studio',
    pitch: 'A drag-and-drop calendar designer that runs in the browser.',
    problem: 'Making a custom printed calendar — photos, holidays, giveaway layouts — usually means fighting a general-purpose design tool.',
    built: "A Next.js editor rebuilt from a single-file prototype into a maintainable app, with a pure calendar engine, undo and redo, and documents saved in IndexedDB so large photos don't hit storage limits.",
    features: [
      'Templates: pastel, classic, modern, split, giveaway 3- and 12-month',
      'Text with live tokens like {MONTH} and {YEAR}, photo frames, 13 shapes',
      'Snap guides, resize, rotate, layers, lock and hide',
      'Per-day labels, colours, pictures and holidays',
      'PNG and print export',
    ],
    tags: ['Next.js', 'TypeScript', 'Zustand', 'IndexedDB'],
    link: '',
    images: ['cover.png'],
  },
  {
    slug: 'qr-code-generator',
    title: 'QR Code Generator',
    pitch: 'Customizable QR codes with live preview and download.',
    problem: 'Most free QR generators are cluttered with ads or put styling and downloads behind a sign-up.',
    built: 'A fast React and Vite web app with a live preview and one-click download, deployed on Vercel with Supabase behind it.',
    features: [
      'Live preview while you type',
      'Customizable styling',
      'One-click download',
      'Guide and FAQ sections for first-time users',
    ],
    tags: ['React', 'Vite', 'Tailwind', 'Supabase'],
    link: 'https://qr-code-generator-rho-cyan.vercel.app/',
    images: ['cover.png'],
  },
];
```

Create the four empty `.gitkeep` files.

- [ ] **Step 4: Run tests** — same command → PASS (7 tests).

---

### Task 2: `ProjectImage` component (image with placeholder fallback)

**Files:**
- Create: `src/components/ProjectImage/index.js`, `implementation/ProjectImage.jsx`, `implementation/ProjectImageProps.js`, `implementation/useProjectImageHandler.js`, `implementation/ProjectImage.scss`, `implementation/ProjectImage.test.jsx`

**Interfaces:**
- Consumes: `projectImageSrc` (Task 1).
- Produces: `<ProjectImage slug file alt label className? loading? />` → `<img class="project-image ...">` or `<div role="img" class="project-image project-image--placeholder">`.

- [ ] **Step 1: Failing test** `implementation/ProjectImage.test.jsx`:
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectImage } from './ProjectImage';

test('renders the screenshot', () => {
  render(<ProjectImage slug="posv2" file="cover.png" alt="POSv2" label="POSv2" />);
  expect(screen.getByRole('img', { name: 'POSv2' })).toHaveAttribute('src', '/projects/posv2/cover.png');
});

test('falls back to a placeholder when the file fails to load', () => {
  render(<ProjectImage slug="posv2" file="missing.png" alt="POSv2" label="POSv2" />);
  fireEvent.error(screen.getByRole('img', { name: 'POSv2' }));
  const placeholder = screen.getByRole('img', { name: 'POSv2' });
  expect(placeholder.tagName).toBe('DIV');
  expect(placeholder).toHaveTextContent('POSv2');
});

test('renders a placeholder when no file is given', () => {
  render(<ProjectImage slug="posv2" alt="POSv2" label="POSv2" />);
  expect(screen.getByRole('img', { name: 'POSv2' }).tagName).toBe('DIV');
});
```

- [ ] **Step 2: Run** `CI=true npx react-scripts test --watchAll=false ProjectImage` → FAIL.

- [ ] **Step 3: Implement**

`useProjectImageHandler.js`:
```js
import { useCallback, useEffect, useState } from 'react';

export const useProjectImageHandler = (slug, file) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [slug, file]);

  const handleError = useCallback(() => setFailed(true), []);

  return { failed, handleError };
};
```

`ProjectImage.jsx`:
```jsx
import { useProjectImageHandler } from './useProjectImageHandler';
import { projectImageSrc } from '../../../utilities/ProjectImage';
import './ProjectImage.scss';

export const ProjectImage = ({ slug, file, alt, label, className = '', loading = 'lazy' }) => {
  const { failed, handleError } = useProjectImageHandler(slug, file);

  if (!file || failed) {
    return (
      <div className={`project-image project-image--placeholder ${className}`} role="img" aria-label={alt}>
        <span className="project-image__label">{label}</span>
      </div>
    );
  }

  return (
    <img
      className={`project-image ${className}`}
      src={projectImageSrc(slug, file)}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={handleError}
    />
  );
};
```

`ProjectImageProps.js`: JSDoc typedef with `slug`, `file?`, `alt`, `label`, `className?`, `loading?` then `export {};`. `index.js`: `export * from './implementation/ProjectImage';`

`ProjectImage.scss`:
```scss
.project-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  &--placeholder {
    display: grid;
    place-items: center;
    background:
      radial-gradient(circle at 25% 30%, rgba(94, 234, 212, 0.16), transparent 55%),
      radial-gradient(circle at 75% 75%, rgba(183, 148, 246, 0.2), transparent 55%),
      #0b1228;
  }

  &__label {
    padding: 0 16px;
    font-size: clamp(20px, 3vw, 40px);
    font-weight: 900;
    letter-spacing: -1px;
    text-align: center;
    color: rgba(255, 255, 255, 0.14);
  }
}
```

- [ ] **Step 4: Run** → PASS (3 tests).

---

### Task 3: `CaseStudyPanel` + Lenis instance access

**Files:**
- Create: `src/components/SmoothScroll/implementation/lenisInstance.js`
- Modify: `src/components/SmoothScroll/implementation/useSmoothScrollHandler.js` (call `setLenis`)
- Create: `src/pages/HomePage/implementation/WorkSection/implementation/CaseStudyPanel/index.js`, `implementation/CaseStudyPanel.jsx`, `implementation/CaseStudyPanelProps.js`, `implementation/useCaseStudyPanelHandler.js`, `implementation/handler/useScrollLockHandler.js`, `implementation/CaseStudyPanel.scss`, `implementation/CaseStudyPanel.test.jsx`

**Interfaces:**
- Consumes: `ProjectImage` (Task 2), a `PROJECTS` item (Task 1).
- Produces: `setLenis(instance|null)`, `getLenis(): Lenis|null`; `<CaseStudyPanel project open onClose />` rendered through a portal into `document.body`. `onClose` must be referentially stable.

- [ ] **Step 1: Failing test** `CaseStudyPanel.test.jsx`:
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CaseStudyPanel } from './CaseStudyPanel';

const project = {
  slug: 'qr',
  title: 'QR Code Generator',
  pitch: 'Pitch text',
  problem: 'Problem text',
  built: 'Built text',
  features: ['Live preview', 'Download'],
  tags: ['React'],
  link: 'https://example.com',
  images: ['cover.png', 'two.png'],
};

test('shows the case study when open', () => {
  render(<CaseStudyPanel project={project} open onClose={() => {}} />);
  expect(screen.getByRole('dialog', { name: 'QR Code Generator' })).toBeInTheDocument();
  expect(screen.getByText('Live preview')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /visit live site/i })).toHaveAttribute('href', 'https://example.com');
});

test('lets the panel scroll while the page is locked', () => {
  render(<CaseStudyPanel project={project} open onClose={() => {}} />);
  expect(screen.getByRole('dialog')).toHaveAttribute('data-lenis-prevent');
});

test('Escape and backdrop close it', () => {
  const onClose = jest.fn();
  render(<CaseStudyPanel project={project} open onClose={onClose} />);
  fireEvent.keyDown(document, { key: 'Escape' });
  fireEvent.click(screen.getByTestId('case-study-backdrop'));
  expect(onClose).toHaveBeenCalledTimes(2);
});

test('Escape does nothing while closed', () => {
  const onClose = jest.fn();
  render(<CaseStudyPanel project={project} open={false} onClose={onClose} />);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).not.toHaveBeenCalled();
});

test('thumbnails switch the main screenshot', () => {
  render(<CaseStudyPanel project={project} open onClose={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: 'Show screenshot 2' }));
  expect(screen.getByRole('img', { name: 'QR Code Generator screenshot 2' })).toHaveAttribute('src', '/projects/qr/two.png');
});

test('renders nothing without a project', () => {
  render(<CaseStudyPanel project={null} open={false} onClose={() => {}} />);
  expect(screen.queryByRole('dialog', { hidden: true })).toBeNull();
});
```

- [ ] **Step 2: Run** `CI=true npx react-scripts test --watchAll=false CaseStudyPanel` → FAIL.

- [ ] **Step 3: Implement**

`lenisInstance.js`:
```js
let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};

export const getLenis = () => instance;
```
In `useSmoothScrollHandler.js` import it, call `setLenis(lenis)` after construction and `setLenis(null)` in cleanup.

`handler/useScrollLockHandler.js`:
```js
import { useEffect } from 'react';
import { getLenis } from '../../../../../../../../components/SmoothScroll/implementation/lenisInstance';

export const useScrollLockHandler = (locked) => {
  useEffect(() => {
    if (!locked) return undefined;
    const lenis = getLenis();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    lenis?.stop();
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [locked]);
};
```

`useCaseStudyPanelHandler.js`:
```js
import { useEffect, useRef, useState } from 'react';
import { useScrollLockHandler } from './handler/useScrollLockHandler';

export const useCaseStudyPanelHandler = ({ open, onClose }) => {
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);

  useScrollLockHandler(open);

  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    setActiveImage(0);
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  return { closeButtonRef, activeImage, setActiveImage };
};
```

`CaseStudyPanel.jsx`:
```jsx
import { createPortal } from 'react-dom';
import { useCaseStudyPanelHandler } from './useCaseStudyPanelHandler';
import { ProjectImage } from '../../../../../../../components/ProjectImage/implementation/ProjectImage';
import './CaseStudyPanel.scss';

export const CaseStudyPanel = ({ project, open, onClose }) => {
  const { closeButtonRef, activeImage, setActiveImage } = useCaseStudyPanelHandler({ open, onClose });

  if (!project) return null;
  const images = project.images ?? [];

  return createPortal(
    <div className={`case-study${open ? ' case-study--open' : ''}`} aria-hidden={!open}>
      <div className="case-study__backdrop" data-testid="case-study-backdrop" onClick={onClose} />
      <aside
        className="case-study__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        data-lenis-prevent
      >
        <button ref={closeButtonRef} type="button" className="case-study__close" onClick={onClose} aria-label="Close case study">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="case-study__hero">
          <ProjectImage
            slug={project.slug}
            file={images[activeImage]}
            alt={`${project.title} screenshot ${activeImage + 1}`}
            label={project.title}
            loading="eager"
          />
        </div>

        {images.length > 1 && (
          <div className="case-study__thumbs">
            {images.map((file, i) => (
              <button
                key={file}
                type="button"
                className={`case-study__thumb${i === activeImage ? ' case-study__thumb--active' : ''}`}
                onClick={() => setActiveImage(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-pressed={i === activeImage}
              >
                <ProjectImage slug={project.slug} file={file} alt="" label={String(i + 1)} />
              </button>
            ))}
          </div>
        )}

        <div className="case-study__content">
          <div className="case-study__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="case-study__tag">{tag}</span>
            ))}
          </div>
          <h2 id="case-study-title" className="case-study__title">{project.title}</h2>
          <p className="case-study__pitch">{project.pitch}</p>

          <h3 className="case-study__subheading">The problem</h3>
          <p className="case-study__text">{project.problem}</p>

          <h3 className="case-study__subheading">What I built</h3>
          <p className="case-study__text">{project.built}</p>

          <h3 className="case-study__subheading">Key features</h3>
          <ul className="case-study__features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          {project.link && (
            <a className="case-study__link" href={project.link} target="_blank" rel="noopener noreferrer">
              Visit live site
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 3h6v6M3 11L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          )}
        </div>
      </aside>
    </div>,
    document.body,
  );
};
```

`CaseStudyPanel.scss`: fixed full-screen overlay (`z-index: 1000`); `visibility: hidden` with `transition: visibility 0s 0.45s` when closed, `visible` and `transition: visibility 0s` when open (this removes the closed panel from the tab order). Backdrop `rgba(2, 6, 18, 0.7)` fading `opacity 0 → 1`. Panel: right-anchored, `width: min(720px, 100%)`, `height: 100%`, `overflow-y: auto`, `overscroll-behavior: contain`, background `#0a1128`, left border `rgba(94,234,212,0.15)`, `transform: translateX(100%)` → `translateX(0)` with `0.45s cubic-bezier(0.22, 1, 0.36, 1)`. Close button: sticky top-right circle, 40px, teal on hover. Hero image `aspect-ratio: 16/10`. Thumbs: horizontal flex, 96×60 buttons, active outlined teal. Content: padding 32px, title `clamp(28px, 4vw, 44px)` weight 800, subheadings teal uppercase letter-spaced 12px, feature list with teal dash markers, link styled as outline pill. Under `max-width: 700px` the panel is full width. Under `prefers-reduced-motion: reduce` transitions are `none`.

- [ ] **Step 4: Run** → PASS (6 tests).

---

### Task 4: `ProjectCard` + `WorkSection` (pinned horizontal gallery, hash routing)

**Files:**
- Modify (rewrite): `WorkSection/implementation/WorkSection.jsx`, `WorkSection.scss`, `useWorkSectionHandler.js`
- Create: `WorkSection/implementation/handler/useHorizontalScrollHandler.js`, `handler/useCaseStudyRouteHandler.js`, `handler/useCaseStudyRouteHandler.test.js`
- Modify (rewrite): `ProjectCard/implementation/ProjectCard.jsx`, `ProjectCard.scss`, `ProjectCardProps.js`, `useProjectCardHandler.js`
- Create: `ProjectCard/implementation/ProjectCard.test.jsx`

**Interfaces:**
- Consumes: `PROJECTS` (Task 1), `ProjectImage` (Task 2), `CaseStudyPanel` (Task 3).
- Produces: `useCaseStudyRouteHandler(projects) → { activeSlug: string|null, openProject(slug), closeProject() }`; `<ProjectCard project index onOpen />`.

- [ ] **Step 1: Failing tests**

`handler/useCaseStudyRouteHandler.test.js`:
```js
import { renderHook, act } from '@testing-library/react';
import { useCaseStudyRouteHandler } from './useCaseStudyRouteHandler';

const projects = [{ slug: 'posv2' }, { slug: 'qr' }];

afterEach(() => window.history.replaceState(null, '', '/'));

test('opening pushes a #work/<slug> entry', () => {
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  act(() => result.current.openProject('qr'));
  expect(result.current.activeSlug).toBe('qr');
  expect(window.location.hash).toBe('#work/qr');
});

test('a shared link opens that project', () => {
  window.history.replaceState(null, '', '/#work/posv2');
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  expect(result.current.activeSlug).toBe('posv2');
});

test('an unknown slug opens nothing', () => {
  window.history.replaceState(null, '', '/#work/nope');
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  expect(result.current.activeSlug).toBeNull();
});

test('closing a shared-link panel clears the hash without going back', () => {
  window.history.replaceState(null, '', '/#work/posv2');
  const back = jest.spyOn(window.history, 'back');
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  act(() => result.current.closeProject());
  expect(back).not.toHaveBeenCalled();
  expect(result.current.activeSlug).toBeNull();
  expect(window.location.hash).toBe('');
  back.mockRestore();
});

test('closing after opening goes back, and popstate clears the panel', () => {
  const back = jest.spyOn(window.history, 'back').mockImplementation(() => {});
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  act(() => result.current.openProject('qr'));
  act(() => result.current.closeProject());
  expect(back).toHaveBeenCalledTimes(1);
  act(() => {
    window.history.replaceState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(result.current.activeSlug).toBeNull();
  back.mockRestore();
});
```

`ProjectCard/implementation/ProjectCard.test.jsx`:
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';

const project = {
  slug: 'qr', title: 'QR Code Generator', pitch: 'Pitch', tags: ['React'],
  link: 'https://example.com', images: ['cover.png'],
};

test('opens the case study for its slug', () => {
  const onOpen = jest.fn();
  render(<ProjectCard project={project} index={0} onOpen={onOpen} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open QR Code Generator case study' }));
  expect(onOpen).toHaveBeenCalledWith('qr');
});

test('shows a separate live link when the project has one', () => {
  render(<ProjectCard project={project} index={0} onOpen={() => {}} />);
  expect(screen.getByRole('link', { name: 'Open QR Code Generator live site' })).toHaveAttribute('href', 'https://example.com');
});
```

- [ ] **Step 2: Run** `CI=true npx react-scripts test --watchAll=false "WorkSection"` → FAIL.

- [ ] **Step 3: Implement**

`handler/useCaseStudyRouteHandler.js`:
```js
import { useCallback, useEffect, useRef, useState } from 'react';

const HASH_PREFIX = '#work/';

const readSlugFromHash = (projects) => {
  const { hash } = window.location;
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const slug = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  return projects.some((project) => project.slug === slug) ? slug : null;
};

export const useCaseStudyRouteHandler = (projects) => {
  const [activeSlug, setActiveSlug] = useState(() => readSlugFromHash(projects));
  const pushedRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      pushedRef.current = false;
      setActiveSlug(readSlugFromHash(projects));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projects]);

  const openProject = useCallback((slug) => {
    window.history.pushState(null, '', `${HASH_PREFIX}${slug}`);
    pushedRef.current = true;
    setActiveSlug(slug);
  }, []);

  const closeProject = useCallback(() => {
    if (pushedRef.current) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setActiveSlug(null);
  }, []);

  return { activeSlug, openProject, closeProject };
};
```

`handler/useHorizontalScrollHandler.js`:
```js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useHorizontalScrollHandler = (sectionRef, trackRef, progressRef) => {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    });

    return () => mm.revert();
  }, [sectionRef, trackRef, progressRef]);
};
```

`useWorkSectionHandler.js`:
```js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PROJECTS } from '../../../../../constants/portfolio';
import { useHorizontalScrollHandler } from './handler/useHorizontalScrollHandler';
import { useCaseStudyRouteHandler } from './handler/useCaseStudyRouteHandler';

export const useWorkSectionHandler = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const lastProjectRef = useRef(null);

  useHorizontalScrollHandler(sectionRef, trackRef, progressRef);
  const { activeSlug, openProject, closeProject } = useCaseStudyRouteHandler(PROJECTS);

  const activeProject = PROJECTS.find((project) => project.slug === activeSlug) ?? null;
  // Keep the last project mounted so the panel can slide out with its content.
  if (activeProject) lastProjectRef.current = activeProject;

  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.work-section__heading span', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    trackRef,
    progressRef,
    projects: PROJECTS,
    activeProject,
    panelProject: lastProjectRef.current,
    openProject,
    closeProject,
  };
};
```

`WorkSection.jsx`:
```jsx
import { useWorkSectionHandler } from './useWorkSectionHandler';
import { ProjectCard } from './ProjectCard';
import { CaseStudyPanel } from './CaseStudyPanel';
import './WorkSection.scss';

export const WorkSection = () => {
  const {
    sectionRef, trackRef, progressRef, projects, activeProject, panelProject, openProject, closeProject,
  } = useWorkSectionHandler();

  return (
    <section id="work" className="work-section" ref={sectionRef}>
      <header className="work-section__header">
        <h2 className="work-section__heading">
          <span>SELECTED</span>
          <span className="work-section__heading--accent">WORK</span>
        </h2>
        <div className="work-section__meta">
          <p className="work-section__subtitle">
            Apps I've designed and built end to end — web, mobile and desktop. Pick one for the full story.
          </p>
          <div className="work-section__progress" aria-hidden="true">
            <span ref={progressRef} className="work-section__progress-bar" />
          </div>
        </div>
      </header>

      <div className="work-section__track" ref={trackRef}>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} onOpen={openProject} />
        ))}
      </div>

      <CaseStudyPanel project={panelProject} open={Boolean(activeProject)} onClose={closeProject} />
    </section>
  );
};
```

`WorkSection.scss`: section `min-height: 100vh; display: flex; flex-direction: column; justify-content: center; gap: 48px; padding: 120px 0 80px; overflow: hidden;` (keep the existing radial background). Header: `max-width: 1400px; width: 100%; margin: 0 auto; padding: 0 80px;` grid `auto 1fr` aligned end (keep heading styles). `__meta` holds subtitle + `__progress` (2px tall, full width, `rgba(255,255,255,0.08)`, `__progress-bar` teal with `transform-origin: left; transform: scaleX(0)`). Track: `display: flex; gap: 40px; width: max-content; padding: 0 80px; will-change: transform;`. At `max-width: 899px` or reduced motion: `padding: 80px 24px`, header single column, track `flex-direction: column; width: 100%; padding: 0 24px;` and progress hidden.

`useProjectCardHandler.js`:
```js
import { useCallback } from 'react';

export const useProjectCardHandler = (slug, onOpen) => {
  const handleOpen = useCallback(() => onOpen(slug), [slug, onOpen]);
  return { handleOpen };
};
```

`ProjectCard.jsx`:
```jsx
import { useProjectCardHandler } from './useProjectCardHandler';
import { ProjectImage } from '../../../../../../../components/ProjectImage/implementation/ProjectImage';
import './ProjectCard.scss';

export const ProjectCard = ({ project, index = 0, onOpen }) => {
  const { handleOpen } = useProjectCardHandler(project.slug, onOpen);
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="project-card" data-cursor-hover>
      <div className="project-card__media">
        <ProjectImage slug={project.slug} file={project.images?.[0]} alt={project.title} label={project.title} />
      </div>
      <div className="project-card__body">
        <span className="project-card__index">{number}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__pitch">{project.pitch}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
        <span className="project-card__cta" aria-hidden="true">View case study →</span>
      </div>
      <button
        type="button"
        className="project-card__open"
        onClick={handleOpen}
        aria-label={`Open ${project.title} case study`}
      />
      {project.link && (
        <a
          className="project-card__live"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live site`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3h6v6M3 11L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
      )}
    </article>
  );
};
```

`ProjectCardProps.js`: typedef `project` (shape from Task 1), `index?`, `onOpen(slug)`.

`ProjectCard.scss`: card `position: relative; width: min(62vw, 760px); flex-shrink: 0; border-radius: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.06); overflow: hidden; transition: transform .4s, border-color .4s;` hover/focus-within: `translateY(-6px)`, teal border. Media `aspect-ratio: 16/9; overflow: hidden;` image `transform: scale(1.0) → 1.04` on hover. Body padding 28px, index teal 13px letter-spaced, title `clamp(24px, 2.4vw, 34px)` 800, pitch muted 15px, tags as current pills, cta teal 13px. `__open`: `position: absolute; inset: 0; z-index: 2; background: none; border: 0; border-radius: inherit;` with `:focus-visible { outline: 2px solid #5eead4; outline-offset: -4px; }`. `__live`: absolute top-right 16px, z-index 3, 36px circle `rgba(5,10,31,0.85)` (no backdrop-filter). At `max-width: 899px`: `width: 100%`.

Delete nothing else; `ProjectCard/index.js` stays.

- [ ] **Step 4: Run** → PASS (7 tests).

---

### Task 5: Hero performance — device gating, pause when hidden, idle tracking loop

**Files:**
- Modify: `HeroSection/implementation/HeroSection.jsx`, `useHeroSectionHandler.js`, `handler/useSplineCursorTrackingHandler.js`, `HeroSection.scss` (append scroll hint + static fallback)
- Create: `HeroSection/implementation/handler/useSplineVisibilityHandler.js`, `handler/useSplineVisibilityHandler.test.js`

**Interfaces:**
- Consumes: `shouldRenderSpline`, `readDeviceCapability` (Task 1).
- Produces: `useSplineVisibilityHandler(sceneRef, visibleRef, onLoad) → { handleSplineLoad(app) }`; `useSplineCursorTrackingHandler(visibleRef) → { handleSplineLoad(app) }`.

- [ ] **Step 1: Failing test** `useSplineVisibilityHandler.test.js`:
```js
import { renderHook, act } from '@testing-library/react';
import { useSplineVisibilityHandler } from './useSplineVisibilityHandler';

let observerCallback;
beforeEach(() => {
  window.IntersectionObserver = jest.fn((cb) => {
    observerCallback = cb;
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
});

const setup = () => {
  const sceneRef = { current: document.createElement('div') };
  const visibleRef = { current: true };
  const onLoad = jest.fn();
  const app = { stop: jest.fn(), play: jest.fn() };
  const { result } = renderHook(() => useSplineVisibilityHandler(sceneRef, visibleRef, onLoad));
  return { result, visibleRef, onLoad, app };
};

test('stops the scene when it scrolls out of view and resumes when back', () => {
  const { result, visibleRef, app } = setup();
  act(() => result.current.handleSplineLoad(app));
  act(() => observerCallback([{ isIntersecting: false }]));
  expect(app.stop).toHaveBeenCalled();
  expect(visibleRef.current).toBe(false);
  act(() => observerCallback([{ isIntersecting: true }]));
  expect(app.play).toHaveBeenCalled();
  expect(visibleRef.current).toBe(true);
});

test('a scene that loads while hidden is stopped immediately', () => {
  const { result, onLoad, app } = setup();
  act(() => observerCallback([{ isIntersecting: false }]));
  act(() => result.current.handleSplineLoad(app));
  expect(onLoad).toHaveBeenCalledWith(app);
  expect(app.stop).toHaveBeenCalled();
});
```

- [ ] **Step 2: Run** `CI=true npx react-scripts test --watchAll=false useSplineVisibility` → FAIL.

- [ ] **Step 3: Implement**

`handler/useSplineVisibilityHandler.js`:
```js
import { useCallback, useEffect, useRef } from 'react';

export const useSplineVisibilityHandler = (sceneRef, visibleRef, onLoad) => {
  const appRef = useRef(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      const app = appRef.current;
      if (!app) return;
      if (entry.isIntersecting) app.play();
      else app.stop();
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [sceneRef, visibleRef]);

  const handleSplineLoad = useCallback((app) => {
    appRef.current = app;
    onLoad?.(app);
    if (!visibleRef.current) app.stop();
  }, [onLoad, visibleRef]);

  return { handleSplineLoad };
};
```

`handler/useSplineCursorTrackingHandler.js`: signature becomes `useSplineCursorTrackingHandler(visibleRef)`. Replace the always-on loop with an idle-stopping one; keep `handleSplineLoad`, name lists and dev logging unchanged:
```js
const SETTLE = 0.0005;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      const head = headRef.current;
      if (head?.rotation) {
        const base = baseRotationsRef.current.get(head) ?? { x: 0, y: 0, z: 0 };
        head.rotation.y = base.y + current.x * HEAD_MAX_RAD;
        head.rotation.x = base.x + current.y * HEAD_MAX_RAD * 0.5;
      }

      eyesRef.current.forEach((eye) => {
        if (!eye?.rotation) return;
        const base = baseRotationsRef.current.get(eye) ?? { x: 0, y: 0, z: 0 };
        eye.rotation.y = base.y + current.x * EYE_MAX_RAD;
        eye.rotation.x = base.x + current.y * EYE_MAX_RAD;
      });

      const settled = Math.abs(target.x - current.x) < SETTLE && Math.abs(target.y - current.y) < SETTLE;
      frameRef.current = settled ? null : requestAnimationFrame(tick);
    };

    const handleMove = (e) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (frameRef.current === null && visibleRef.current && headRef.current) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    window.addEventListener('mousemove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [visibleRef]);
```

`useHeroSectionHandler.js`: add
```js
const sceneRef = useRef(null);
const visibleRef = useRef(true);
const [canRenderSpline] = useState(() => shouldRenderSpline(readDeviceCapability()));
const { handleSplineLoad: handleTrackingLoad } = useSplineCursorTrackingHandler(visibleRef);
const { handleSplineLoad } = useSplineVisibilityHandler(sceneRef, visibleRef, handleTrackingLoad);
```
and return `sceneRef`, `canRenderSpline`, `handleSplineLoad` alongside the existing values. Add `'.hero-section__scroll-hint'` fade-in (`opacity: 0, duration: 0.8, delay: 1.2`) to the existing GSAP context.

`HeroSection.jsx`: scene `div` gets `ref={sceneRef}`; render `<Spline …>` only when `canRenderSpline`, otherwise `<div className="hero-section__scene-fallback hero-section__scene-fallback--static" />`. Add before the closing `</section>`:
```jsx
<span className="hero-section__scroll-hint" aria-hidden="true">
  SCROLL
  <span className="hero-section__scroll-line" />
</span>
```

`HeroSection.scss` (append inside `.hero-section`): `&__scene-fallback--static` = larger soft violet/teal radial glow with a slow 8s `ease-in-out` breathing scale animation (disabled under reduced motion). `&__scroll-hint`: absolute, bottom 32px, centred, 11px letter-spacing 4px muted text, flex column; `&__scroll-line`: 1px × 48px teal line with a 1.8s `scaleY` drip animation from the top (disabled under reduced motion).

- [ ] **Step 4: Run** → PASS (2 tests).

---

### Task 6: Custom cursor — idle loop, off on touch

**Files:**
- Modify: `src/components/CustomCursor/implementation/useCustomCursorHandler.js`, `CustomCursor.jsx`

**Interfaces:**
- Produces: `useCustomCursorHandler() → { enabled: boolean, cursorRef, ringRef }`.

- [ ] **Step 1: Implement** (pure rAF/DOM glue; covered by the manual check in Task 9)

`useCustomCursorHandler.js`:
```js
import { useEffect, useRef, useState } from 'react';

const SETTLE_PX = 0.1;

export const useCustomCursorHandler = () => {
  const [enabled] = useState(
    () => !window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches,
  );
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return undefined;
    let frame = null;

    const tick = () => {
      const target = targetRef.current;
      const dot = positionRef.current;
      const ring = ringPositionRef.current;
      dot.x += (target.x - dot.x) * 0.35;
      dot.y += (target.y - dot.y) * 0.35;
      ring.x += (target.x - ring.x) * 0.15;
      ring.y += (target.y - ring.y) * 0.15;

      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;

      const settled = Math.abs(target.x - ring.x) < SETTLE_PX && Math.abs(target.y - ring.y) < SETTLE_PX
        && Math.abs(target.x - dot.x) < SETTLE_PX && Math.abs(target.y - dot.y) < SETTLE_PX;
      frame = settled ? null : requestAnimationFrame(tick);
    };

    const handleMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    const handleEnter = (e) => {
      if (e.target.closest?.('a, button, [data-cursor-hover]')) ringRef.current?.classList.add('cursor-hovered');
    };

    const handleLeave = (e) => {
      if (e.target.closest?.('a, button, [data-cursor-hover]')) ringRef.current?.classList.remove('cursor-hovered');
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { enabled, cursorRef, ringRef };
};
```

`CustomCursor.jsx`: destructure `enabled`; `if (!enabled) return null;` before the JSX.

- [ ] **Step 2: Verify** `npm run build` compiles.

---

### Task 7: About section — drop Spline, add StatsStrip

**Files:**
- Modify: `AboutSection/implementation/AboutSection.jsx`, `AboutSection.scss`, `useAboutSectionHandler.js`
- Create: `AboutSection/implementation/StatsStrip/index.js`, `implementation/StatsStrip.jsx`, `implementation/StatsStripProps.js`, `implementation/useStatsStripHandler.js`, `implementation/StatsStrip.scss`, `implementation/parseStat.js`, `implementation/parseStat.test.js`
- Modify: `src/constants/portfolio.js` (remove `SPLINE_SCENES.about`)

**Interfaces:**
- Consumes: `STATS` (Task 1).
- Produces: `parseStat(raw: string) → { number: number|null, suffix: string }`; `<StatsStrip stats />`.

- [ ] **Step 1: Failing test** `parseStat.test.js`:
```js
import { parseStat } from './parseStat';

test('splits a number from its suffix', () => {
  expect(parseStat('4+')).toEqual({ number: 4, suffix: '+' });
});

test('plain numbers have no suffix', () => {
  expect(parseStat('12')).toEqual({ number: 12, suffix: '' });
});

test('non-numeric values are kept as text', () => {
  expect(parseStat('Web')).toEqual({ number: null, suffix: 'Web' });
});
```

- [ ] **Step 2: Run** `CI=true npx react-scripts test --watchAll=false parseStat` → FAIL.

- [ ] **Step 3: Implement**

`parseStat.js`:
```js
export const parseStat = (raw) => {
  const match = /^(\d+)(.*)$/.exec(String(raw));
  return match ? { number: Number(match[1]), suffix: match[2] } : { number: null, suffix: String(raw) };
};
```

`useStatsStripHandler.js`:
```js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useStatsStripHandler = () => {
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      strip.querySelectorAll('[data-count-to]').forEach((el) => {
        const target = Number(el.dataset.countTo);
        const counter = { value: 0 };
        el.textContent = '0';
        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: strip, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
      gsap.from('.stats-strip__item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: strip, start: 'top 85%' },
      });
    }, strip);

    return () => ctx.revert();
  }, []);

  return { stripRef };
};
```

`StatsStrip.jsx`:
```jsx
import { useStatsStripHandler } from './useStatsStripHandler';
import { parseStat } from './parseStat';
import './StatsStrip.scss';

export const StatsStrip = ({ stats }) => {
  const { stripRef } = useStatsStripHandler();

  return (
    <dl className="stats-strip" ref={stripRef}>
      {stats.map(({ value, label }) => {
        const { number, suffix } = parseStat(value);
        return (
          <div key={label} className="stats-strip__item">
            <dt className="stats-strip__label">{label}</dt>
            <dd className="stats-strip__value">
              {number !== null && <span data-count-to={number}>{number}</span>}
              {suffix}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
```
`StatsStripProps.js`: typedef `stats: Array<{value: string, label: string}>`. `index.js` re-export.

`StatsStrip.scss`: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden; max-width: 1200px; margin: 0 auto;` items `display: flex; flex-direction: column-reverse; gap: 8px; padding: 32px; background: #050a1f;` value `clamp(44px, 6vw, 80px)` weight 900 white with teal suffix via `color` gradient text (`background: linear-gradient(90deg,#fff,#5eead4); -webkit-background-clip: text; color: transparent;`), label muted 14px. At `max-width: 700px`: one column.

`AboutSection.jsx`: remove Spline/`Suspense`/`lazy`/`SPLINE_SCENES`; layout:
```jsx
<section id="about" className="about-section" ref={sectionRef}>
  <div className="about-section__inner">
    <h2 className="about-section__heading">ABOUT ME</h2>
    <div className="about-section__copy">
      <p className="about-section__lead">I build fast, production-ready apps — from the database to the pixels.</p>
      {/* the two existing paragraphs, unchanged */}
    </div>
  </div>
  <StatsStrip stats={STATS} />
</section>
```

`useAboutSectionHandler.js`: delete the `.about-section__scene` tween; animate `.about-section__lead` with the paragraphs.

`AboutSection.scss`: section `padding: 140px 80px; display: flex; flex-direction: column; gap: 80px;` (keep background); `__inner` `max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 2fr; gap: 60px;`; `__lead` `clamp(26px, 3vw, 40px)` weight 700 white line-height 1.2; at `max-width: 1024px` single column, `padding: 80px 24px`. Remove `__scene` rules.

`portfolio.js`: remove the `about` key from `SPLINE_SCENES`.

- [ ] **Step 4: Run** → PASS (3 tests); `npm run build` compiles.

---

### Task 8: Skills marquee replaces "What I Do"; page order; nav

**Files:**
- Create: `src/pages/HomePage/implementation/SkillsSection/index.js`, `implementation/SkillsSection.jsx`, `implementation/SkillsSection.scss`, `implementation/useSkillsSectionHandler.js`, `implementation/MarqueeRow/index.js`, `implementation/MarqueeRow/implementation/MarqueeRow.jsx`, `MarqueeRowProps.js`, `MarqueeRow.scss`, `MarqueeRow.test.jsx`
- Delete: `src/pages/HomePage/implementation/WhatIDoSection/` (whole folder, incl. `SkillCard`)
- Modify: `HomePage.jsx` (order Hero, About, Work, Skills, Contact), `src/constants/portfolio.js` (remove `SPLINE_SCENES.whatIDo`), `src/components/PortfolioHeader/implementation/usePortfolioHeaderHandler.js` (scroll with Lenis)

**Interfaces:**
- Consumes: `FRONTEND_SKILLS`, `BACKEND_SKILLS`; `getLenis` (Task 3).
- Produces: `<MarqueeRow label items reverse? />`.

- [ ] **Step 1: Failing test** `MarqueeRow.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { MarqueeRow } from './MarqueeRow';

test('lists each skill once for screen readers and duplicates it for the loop', () => {
  render(<MarqueeRow label="Frontend" items={['React', 'SCSS']} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getAllByText('React')).toHaveLength(2);
});
```

- [ ] **Step 2: Run** `CI=true npx react-scripts test --watchAll=false MarqueeRow` → FAIL.

- [ ] **Step 3: Implement**

`MarqueeRow.jsx`:
```jsx
import './MarqueeRow.scss';

export const MarqueeRow = ({ label, items, reverse = false }) => (
  <div className={`marquee-row${reverse ? ' marquee-row--reverse' : ''}`}>
    <span className="marquee-row__label">{label}</span>
    <div className="marquee-row__viewport">
      <ul className="marquee-row__track" aria-label={`${label} skills`}>
        {items.map((item) => (
          <li key={item} className="marquee-row__item">{item}</li>
        ))}
        {items.map((item) => (
          <li key={`${item}-copy`} className="marquee-row__item marquee-row__item--copy" aria-hidden="true">{item}</li>
        ))}
      </ul>
    </div>
  </div>
);
```
(`aria-hidden` items are excluded from `getAllByRole`, so the test sees 2 list items but 2 text matches.)

`MarqueeRow.scss`: label teal uppercase 12px letter-spacing 4px; viewport `overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);` track `display: flex; width: max-content; margin: 0; padding: 0; list-style: none; animation: marquee-row-scroll 40s linear infinite;` items `padding: 0 24px; font-size: clamp(32px, 5vw, 72px); font-weight: 900; color: transparent; -webkit-text-stroke: 1px rgba(226,232,240,0.35); white-space: nowrap; transition: color .3s;` item hover `color: #5eead4; -webkit-text-stroke-color: #5eead4;`; `.marquee-row:hover .marquee-row__track { animation-play-state: paused; }`; `--reverse` → `animation-direction: reverse`. `@keyframes marquee-row-scroll { to { transform: translateX(-50%); } }`. Reduced motion: `animation: none; flex-wrap: wrap; width: auto;` and `__item--copy { display: none; }`.

`SkillsSection.jsx`:
```jsx
import { useSkillsSectionHandler } from './useSkillsSectionHandler';
import { MarqueeRow } from './MarqueeRow';
import { FRONTEND_SKILLS, BACKEND_SKILLS } from '../../../../../constants/portfolio';
import './SkillsSection.scss';

export const SkillsSection = () => {
  const { sectionRef } = useSkillsSectionHandler();

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <header className="skills-section__header">
        <h2 className="skills-section__heading">
          <span>WHAT</span>
          <span className="skills-section__heading--accent">I DO</span>
        </h2>
        <p className="skills-section__intro">
          Frontend to backend — interfaces people enjoy using, on servers that scale.
        </p>
      </header>
      <MarqueeRow label="Frontend" items={FRONTEND_SKILLS} />
      <MarqueeRow label="Backend" items={BACKEND_SKILLS} reverse />
    </section>
  );
};
```
`useSkillsSectionHandler.js`: GSAP context fading `.skills-section__heading span` and `.marquee-row` up (`y: 40`, stagger 0.12, trigger section `top 75%`), returns `{ sectionRef }`. `SkillsSection.scss`: `padding: 140px 0; display: flex; flex-direction: column; gap: 48px;` violet radial background like the old section; header `max-width: 1400px; margin: 0 auto; padding: 0 80px;` with the old heading look; rows padded `0 80px` for the label; mobile `padding: 80px 0`, header `0 24px`.

`HomePage.jsx`: replace `WhatIDoSection` import/usage with `SkillsSection`, order `Hero, About, Work, Skills, Contact`.

`portfolio.js`: remove `whatIDo` from `SPLINE_SCENES` (only `hero` remains).

`usePortfolioHeaderHandler.js` `handleNavClick`: 
```js
const lenis = getLenis();
if (lenis) lenis.scrollTo(target, { offset: 0 });
else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
```
(import `getLenis` from `../../SmoothScroll/implementation/lenisInstance`).

Delete `WhatIDoSection/`; `grep -rn "WhatIDo\|SkillCard\|SPLINE_SCENES.about\|SPLINE_SCENES.whatIDo" src` → no matches.

- [ ] **Step 4: Run** → PASS; full suite `CI=true npx react-scripts test --watchAll=false` → all pass.

---

### Task 9: Verify — build, before/after numbers, manual run

- [ ] **Step 1:** `npm run build` → compiles; record gzipped sizes from output and compare with the baseline build captured before Task 1 (`scratchpad/build-before.log`).
- [ ] **Step 2:** Count WebGL contexts/Spline runtimes: serve both builds (`npx serve -s <dir>`), in DevTools Performance record 5s of scrolling through the page on each, compare FPS/main-thread time. If no browser automation is available, report the structural numbers (Spline instances 3 → 1, always-on rAF loops 3 → 0 idle) and ask the user to eyeball.
- [ ] **Step 3:** Dev server manual pass (desktop + 375px): hero, stats count-up, pinned horizontal work scroll + progress bar, panel open/close (click, Esc, backdrop, Back), shared link `/#work/posv2`, placeholders shown, marquee moves/pauses, nav links scroll, no horizontal page scroll on mobile.
- [ ] **Step 4:** Report to the user; commit only when asked.
