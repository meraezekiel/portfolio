// A pinned section sits at the bottom of its GSAP pin-spacer once the pin has ended, so scrolling to
// the section itself would land at the end of the pin. Scroll to the spacer to start from the top.
export const resolveScrollTarget = (el) => {
  const parent = el.parentElement;
  return parent?.classList.contains('pin-spacer') ? parent : el;
};
