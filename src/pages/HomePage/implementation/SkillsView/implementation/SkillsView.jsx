import { SectionView } from '../../../../../components/SectionView';
import {
  FRONTEND_SKILLS, BACKEND_SKILLS, TOOLS, navLink,
} from '../../../../../constants/portfolio';
import './SkillsView.scss';

const GROUPS = [
  { title: 'Frontend & apps', note: 'Web, mobile and desktop interfaces.', items: FRONTEND_SKILLS },
  { title: 'Backend', note: 'APIs, services and databases.', items: BACKEND_SKILLS },
  { title: 'Daily tools', note: 'What I work in every day.', items: TOOLS.map(({ name }) => name) },
];

export const SkillsView = () => {
  const { label, icon } = navLink('skills');

  return (
    <SectionView icon={icon} title={label} intro="Frontend and backend — the stack I reach for first.">
      <div className="section-view__grid">
        {GROUPS.map(({ title, note, items }) => (
          <article key={title} className="section-view__card skills-view__card">
            <h2 className="section-view__card-title">{title}</h2>
            <p className="section-view__text">{note}</p>
            <ul className="skills-view__list">
              {[...new Set(items)].map((item) => (
                <li key={item} className="skills-view__pill">
                  <span aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionView>
  );
};
