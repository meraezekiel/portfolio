export const projectImageSrc = (slug, file) =>
  `${process.env.PUBLIC_URL || ''}/projects/${slug}/${encodeURIComponent(file)}`;
