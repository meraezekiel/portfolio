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
// 5. Paste it below as the `hero` value (and reuse for about/whatIDo or pick separate ones).
//
// If your chosen scene's head/eye objects use different names, add them to HEAD_NAMES /
// EYE_NAMES in useSplineCursorTrackingHandler.js — or rename them in Spline before exporting.
export const SPLINE_SCENES = {
  hero: 'https://prod.spline.design/5zTWuABu-wb2ZxpD/scene.splinecode',
  about: 'https://prod.spline.design/5zTWuABu-wb2ZxpD/scene.splinecode',
  whatIDo: 'https://prod.spline.design/5zTWuABu-wb2ZxpD/scene.splinecode',
};

export const NAV_LINKS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'WORK' },
  { id: 'contact', label: 'CONTACT' },
];

export const FRONTEND_SKILLS = [
  'React', 'Next.js', 'TypeScript', 'MUI', 'SCSS', 'Redux', 'React Native',
];

export const BACKEND_SKILLS = [
  'Node.js', 'NestJS', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs',
];

export const PROJECTS = [
  {
    id: 1,
    title: 'EarthTracker',
    description: 'Asset tracking platform with real-time inventory and analytics.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image: '',
    link: '',
  },
  {
    id: 2,
    title: 'Portfolio Site',
    description: 'Interactive 3D portfolio with scroll-driven animations.',
    tags: ['React', 'Spline', 'GSAP'],
    image: '',
    link: '',
  },
  {
    id: 3,
    title: 'Mobile Suite',
    description: 'Cross-platform React Native app with offline-first architecture.',
    tags: ['React Native', 'Redux', 'SQLite'],
    image: '',
    link: '',
  },
  {
    id: 4,
    title: 'QR Code Generator',
    description: 'Lightweight web app to generate customizable QR codes on the fly.',
    tags: ['React', 'Vercel'],
    image: '',
    link: 'https://qr-code-generator-rho-cyan.vercel.app/',
  },
];
