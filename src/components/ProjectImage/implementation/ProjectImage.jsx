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
