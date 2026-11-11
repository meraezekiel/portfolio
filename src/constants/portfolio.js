export const PORTFOLIO_CONFIG = {
  name: 'John Antoque',
  handle: '@johnantoque',
  role: 'Full-Stack Engineer',
  email: 'androidantoque@gmail.com',
  experience: '4+',
  // A social with an empty URL hides its sidebar button.
  socials: {
    github: 'https://github.com/meraezekiel',
    linkedin: '',
  },
  // Floating status pill. Set to '' to hide it.
  availability: 'Available for work',
};

export const NAV_LINKS = [
  { id: 'hero', label: 'Home', icon: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z' },
  { id: 'work', label: 'Projects', icon: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z' },
  { id: 'experience', label: 'Experience', icon: 'M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18' },
  { id: 'services', label: 'Services', icon: 'm12 2 10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { id: 'skills', label: 'Skillset', icon: 'm18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16' },
  { id: 'highlights', label: 'Highlights', icon: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z' },
  { id: 'about', label: 'About', icon: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM20 21a8 8 0 0 0-16 0' },
  { id: 'contact', label: 'Contact', icon: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z' },
];

export const navLink = (id) => NAV_LINKS.find((link) => link.id === id);

export const TOOLS = [
  { name: 'VS Code', color: '#2f7cf6', mark: '</>' },
  { name: 'Cursor', color: '#14213d', mark: 'C' },
  { name: 'Claude Code', color: '#d97757', mark: '✳' },
  { name: 'GitHub', color: '#24292f', mark: 'G' },
  { name: 'Figma', color: '#a259ff', mark: 'F' },
  { name: 'Postman', color: '#ff6c37', mark: 'P' },
  { name: 'Docker', color: '#1d91e6', mark: 'D' },
  { name: 'Vercel', color: '#000000', mark: '▲' },
  { name: 'Notion', color: '#37352f', mark: 'N' },
];

export const FRONTEND_SKILLS = [
  'React', 'Next.js', 'TypeScript', 'MUI', 'SCSS', 'Redux', 'React Native', 'Expo', 'Tauri', 'Rust',
];

export const BACKEND_SKILLS = [
  'Node.js', 'NestJS', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs',
];

// About view copy (from the earlier About section).
export const ABOUT = {
  lead: 'I build fast, production-ready apps — from the database to the pixels.',
  paragraphs: [
    'Full-stack developer with 4+ years of experience building scalable web applications with React, Next.js, Node.js and NestJS. Skilled in microservices, CMS development and low-code platforms, taking products from concept to deployment.',
  ],
};

// `text` is shown on the Services view. DRAFT copy — edit to taste.
export const SERVICES = [
  {
    label: 'Web apps',
    icon: 'M3 4h18v12H3zM8 20h8M12 16v4',
    text: 'Production web applications with React and Next.js, from the first screen to deployment.',
  },
  {
    label: 'Micro-frontends',
    icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    text: 'Splitting a large front end into parts that separate teams can build and ship on their own.',
  },
  {
    label: 'REST APIs',
    icon: 'm18 16 4-4-4-4M6 8l-4 4 4 4',
    text: 'Back ends and APIs with Node.js, NestJS and Express, on PostgreSQL or MongoDB.',
  },
  {
    label: 'Mobile apps',
    icon: 'M7 2h10v20H7zM11 18h2',
    text: 'React Native and Expo apps for Android and iOS, including ones that work fully offline.',
  },
  {
    label: 'Performance audits',
    icon: 'M13 2 3 14h9l-1 8 10-12h-9z',
    text: 'Finding what makes an app slow or heavy, and fixing it.',
  },
];

// Experience view, newest first. `points`, `tags` and `note` are optional.
export const EXPERIENCE = [
  {
    company: 'EarthTrack',
    role: 'Full Stack Engineer',
    period: 'Jul 2024 – Present',
    current: true,
    points: [
      'Build the offline-first React Native app warehouse teams use with RFID devices: stocktakes, inbound, outbound and check-out keep working without signal and sync when back online.',
      'Build features across the Next.js web portal: stocktake planning and approvals, inventory dashboards, a consumption trend chart, exceptions and label settings.',
      'Build NestJS APIs on PostgreSQL and AWS serverless: server-side exports, a stock coverage and forecast engine, offline messaging sync, and security hardening.',    ],
    tags: ['Next.js', 'React Native', 'TypeScript', 'NestJS', 'PostgreSQL', 'AWS'],
  },
  {
    company: 'Chugo Pte Ltd',
    role: 'Junior Full Stack Developer',
    period: 'Aug 2022 – May 2024',
    points: [
      'Built a business card app with React Native, Node.js and Firebase that uses AI to capture, create and share name cards.',
      'Built e-commerce and dating apps for Android and iOS with React Native, Node.js and Directus.',
      'Built an e-commerce website and a platform where employers post part-time jobs and part-timers find gigs, with React and Node.js.',
    ],
    tags: ['React Native', 'React', 'Node.js', 'Firebase', 'Directus'],
  },
  {
    company: 'Before tech',
    role: 'Accounting, audit and HR',
    period: '2017 – 2022',
    points: [
      'Regional Roving Accountant at Prycegases Inc., auditing sales centers and an LPG plant.',
      'Field Associate (HR) at Yearnings Outsourcing Cooperative.',
      'Accounting Clerk (LTO registration and IT) at Avescor Motors Bacolod.',
    ],
    note: 'Years inside real shops and sales centers are why my point-of-sale work gets VAT and the daily cash count right.',
  },
];

export const CONTACT_NOTE = "Tell me what you're building. I usually reply within a day.";

export const HIGHLIGHTS = [
  { title: '4+ years in production', text: 'Scalable web applications with React, Next.js, Node.js and NestJS.', tag: 'Web · APIs · Microservices' },
  { title: '4 featured projects', text: 'Point-of-sale, ID photo, calendar and QR tools, built end to end.', tag: 'Concept · Build · Deploy' },
  { title: '3 platforms', text: 'Web, mobile and desktop, including apps that work fully offline.', tag: 'Next.js · React Native · Tauri' },
];

// SCREENSHOTS: put image files in public/projects/<slug>/ and list their file names in
// `images`. The first one is the card cover. Missing files show a placeholder.
export const PROJECTS = [
  {
    slug: 'posv2',
    title: 'POSv2',
    tagline: 'offline, first.',
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
    images: ['cover.webp', 'products.webp', 'reports.webp'],
  },
  {
    slug: 'photo-studio',
    title: 'Philmer ID Photo Studio',
    tagline: 'print-ready, offline.',
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
    images: ['cover.webp'],
  },
  {
    slug: 'kalendario-studio',
    title: 'Kalendaryo Studio',
    tagline: 'drag, drop, print.',
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
    images: ['cover.webp', 'giveaway-template.webp'],
  },
  {
    slug: 'qr-code-generator',
    title: 'QR Code Generator',
    tagline: 'codes on the fly.',
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
    images: ['cover.webp', 'live-preview.webp'],
  },
];
