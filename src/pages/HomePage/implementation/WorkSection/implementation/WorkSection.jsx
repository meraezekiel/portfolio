import { useWorkSectionHandler } from './useWorkSectionHandler';
import { CaseStudyPanel } from './CaseStudyPanel';
import { BentoTile } from '../../../../../components/BentoTile';
import { TileHeading } from '../../../../../components/TileHeading';
import { ProjectImage } from '../../../../../components/ProjectImage';
import './WorkSection.scss';

const FOLDER_ICON = 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z';

const projectAddress = ({ link, slug }) => (link ? new URL(link).hostname : slug);

export const WorkSection = () => {
  const {
    projects, current, shownProject, select, pause, resume,
    openShownProject, activeProject, panelProject, closeProject,
  } = useWorkSectionHandler();

  return (
    <BentoTile
      as="section"
      wide
      id="work"
      className="work-section"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div className="work-section__intro">
        <TileHeading icon={FOLDER_ICON} title="PROJECTS" />
        <p className="tile-text">A few things I've shipped recently — production apps, side projects, and experiments.</p>
        <div className="work-section__dots">
          {projects.map(({ slug, title }, index) => (
            <button
              key={slug}
              type="button"
              aria-label={`Show ${title}`}
              aria-pressed={index === current}
              className={`work-section__dot${index === current ? ' work-section__dot--active' : ''}`}
              onClick={() => select(index)}
            />
          ))}
        </div>
      </div>

      <div className="work-section__preview">
        <button
          type="button"
          className="work-section__browser"
          onClick={openShownProject}
          aria-label={`Open ${shownProject.title} case study`}
        >
          <span className="work-section__bar">
            <span className="work-section__light work-section__light--on" />
            <span className="work-section__light" />
            <span className="work-section__light" />
            <span className="work-section__address">{projectAddress(shownProject)}</span>
          </span>
          <span className="work-section__page">
            <span className="work-section__copy">
              <span className="work-section__title">{shownProject.title}</span>
              <span className="work-section__tagline">{shownProject.tagline}</span>
            </span>
            <span className="work-section__shot">
              <ProjectImage slug={shownProject.slug} file={shownProject.images?.[0]} alt="" label={shownProject.title} />
              <span className="work-section__tags">
                {shownProject.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="work-section__tag">{tag}</span>
                ))}
              </span>
            </span>
          </span>
        </button>
        <div className="work-section__base" />
      </div>

      <CaseStudyPanel project={panelProject} open={Boolean(activeProject)} onClose={closeProject} />
    </BentoTile>
  );
};
