import { SectionView } from '../../../../../components/SectionView';
import { ViewLink } from '../../../../../components/ViewLink';
import { EXPERIENCE, navLink } from '../../../../../constants/portfolio';
import './ExperienceView.scss';

export const ExperienceView = () => {
  const { label, icon } = navLink('experience');

  return (
    <SectionView icon={icon} title={label} intro="Where I've worked and what I built there.">
      <ol className="experience-view__timeline">
        {EXPERIENCE.map(({
          company, role, period, points, tags, note, current,
        }) => (
          <li key={`${company}-${period}`} className={`section-view__card experience-view__item${current ? ' experience-view__item--current' : ''}`}>
            <div className="experience-view__head">
              <div>
                <h2 className="section-view__card-title">{role}</h2>
                <p className="experience-view__company">{company}</p>
              </div>
              <span className="experience-view__badges">
                {current && <span className="experience-view__current">Current</span>}
                <span className="experience-view__period">{period}</span>
              </span>
            </div>
            {points?.length > 0 && (
              <ul className="experience-view__points">
                {points.map((point) => <li key={point} className="section-view__text">{point}</li>)}
              </ul>
            )}
            {note && <p className="experience-view__note">{note}</p>}
            {tags && (
              <ul className="experience-view__tags" aria-label="Stack">
                {tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ol>
      <p className="experience-view__next">
        Want to see the work itself?
        {' '}
        <ViewLink to="work">See the projects</ViewLink>
      </p>
    </SectionView>
  );
};
