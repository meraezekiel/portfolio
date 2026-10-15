export const PORTFOLIO_CONFIG = {
  name: 'JOHN ANTOQUE',
  initials: 'JA',
  email: 'androidantoque@gmail.com',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/johnantoqueearthtrack',
    linkedin: '',
    twitter: '',
  },
  roles: ['ENGINEER', 'DEVELOPER', 'CREATOR'],
};

// HOW TO REPLACE THESE PLACEHOLDER SCENES:
// 1. Go to https://app.spline.design/community
// 2. Search "avatar", "character", "robot follow cursor", or "look at mouse"
// 3. Pick a scene with a named "Head" object (and ideally "Eye" / "Left Eye" / "Right Eye")
//    — those names are what the cursor-tracking code looks for in HeroSection.
// 4. Open the scene → top-right Export button → Code → React → copy the URL
//    (it ends in `.splinecode`, e.g. https://prod.spline.design/<id>/scene.splinecode)
// 5. Paste it below as the `hero` value.
//
// Only the hero renders 3D: one WebGL scene keeps the page smooth. It is skipped on touch
// devices, low-core machines and reduced motion (see utilities/DeviceCapability.js).
//
// If your chosen scene's head/eye objects use different names, add them to HEAD_NAMES /
// EYE_NAMES in useSplineCursorTrackingHandler.js — or rename them in Spline before exporting.
export const SPLINE_SCENES = {
  hero: 'https://prod.spline.design/5zTWuABu-wb2ZxpD/scene.splinecode',
};

export const NAV_LINKS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'WORK' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
];

export const FRONTEND_SKILLS = [
  'React', 'Next.js', 'TypeScript', 'MUI', 'SCSS', 'Redux', 'React Native',
];

export const BACKEND_SKILLS = [
  'Node.js', 'NestJS', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs',
];

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
