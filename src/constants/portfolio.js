export const PORTFOLIO_CONFIG = {
  name: 'John Antoque',
  firstName: 'John',
  initials: 'JA',
  email: 'androidantoque@gmail.com',
  // Add public/resume.pdf and set this to '/resume.pdf' to show the Résumé link.
  resumeUrl: '',
  socials: {
    github: 'https://github.com/johnantoqueearthtrack',
    linkedin: '',
    twitter: '',
  },
  // Hero "availability" tile. Set to null to hide it.
  availability: {
    label: 'Open to work',
    detail: 'Freelance projects & full-time roles',
  },
  // Slug of the project shown in the hero's "Latest project" tile.
  latestProject: 'photo-studio',
};

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const STACK_HIGHLIGHTS = ['React', 'Next.js', 'Node', 'NestJS', 'React Native', 'Tauri'];

export const FRONTEND_SKILLS = [
  'React', 'Next.js', 'TypeScript', 'MUI', 'SCSS', 'Redux',
];

export const BACKEND_SKILLS = [
  'Node.js', 'NestJS', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs',
];

export const MOBILE_DESKTOP_SKILLS = [
  'React Native', 'Expo', 'Tauri', 'Rust',
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
