import { useProjectsViewHandler } from './useProjectsViewHandler';
import { SectionView } from '../../../../../components/SectionView';
import { ProjectImage } from '../../../../../components/ProjectImage';
import { CaseStudyPanel } from '../../WorkSection/implementation/CaseStudyPanel';
import { navLink } from '../../../../../constants/portfolio';
import './ProjectsView.scss';
import { ArrowIcon } from '../../../../../components/ArrowIcon';

export const ProjectsView = () => {
  const {
    projects, openProject, closeProject, panelOpen, panelProject,
  } = useProjectsViewHandler();
  const { label, icon } = navLink('work');

  return (
    <SectionView
      icon={icon}
      title={label}
      intro="Production apps, side projects and experiments. Open one for the full case study."
    >
      <div className="section-view__grid projects-view__grid">
        {projects.map((project) => (
          <button
            key={project.slug}
            type="button"
            className="section-view__card projects-view__card"
            onClick={() => openProject(project.slug)}
            aria-label={`Open ${project.title} case study`}
          >
            <span className="projects-view__shot">
              <ProjectImage slug={project.slug} file={project.images?.[0]} alt="" label={project.title} />
            </span>
            <span className="projects-view__copy">
              <span className="section-view__card-title">{project.title}</span>
              <span className="section-view__text">{project.pitch}</span>
              <span className="projects-view__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="projects-view__tag">{tag}</span>
                ))}
              </span>
              <span className="projects-view__more">
                Read case study
                <ArrowIcon size={12} />
              </span>
            </span>
          </button>
        ))}
      </div>
      <CaseStudyPanel project={panelProject} open={panelOpen} onClose={closeProject} />
    </SectionView>
  );
};
