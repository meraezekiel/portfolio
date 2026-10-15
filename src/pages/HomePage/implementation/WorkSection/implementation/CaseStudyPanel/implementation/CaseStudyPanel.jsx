import { createPortal } from 'react-dom';
import { useCaseStudyPanelHandler } from './useCaseStudyPanelHandler';
import { ProjectImage } from '../../../../../../../components/ProjectImage/implementation/ProjectImage';
import './CaseStudyPanel.scss';

export const CaseStudyPanel = ({ project, open, onClose }) => {
  const {
    panelRef, closeButtonRef, activeImage, setActiveImage,
  } = useCaseStudyPanelHandler({ open, onClose });

  if (!project) return null;
  const images = project.images ?? [];

  return createPortal(
    <div className={`case-study${open ? ' case-study--open' : ''}`} aria-hidden={!open}>
      <div className="case-study__backdrop" data-testid="case-study-backdrop" onClick={onClose} />
      <aside
        ref={panelRef}
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
