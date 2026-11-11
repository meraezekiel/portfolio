import { SectionView } from '../../../../../components/SectionView';
import { ViewLink } from '../../../../../components/ViewLink';
import { HIGHLIGHTS, navLink } from '../../../../../constants/portfolio';
import './HighlightsView.scss';

export const HighlightsView = () => {
  const { label, icon } = navLink('highlights');

  return (
    <SectionView icon={icon} title={label} intro="The work so far, in three lines.">
      <div className="section-view__grid">
        {HIGHLIGHTS.map(({ title, text, tag }, index) => (
          <article key={title} className="section-view__card highlights-view__card">
            <span className="highlights-view__number">{String(index + 1).padStart(2, '0')}</span>
            <h2 className="highlights-view__title">{title}</h2>
            <p className="section-view__text">{text}</p>
            <span className="highlights-view__tag">{tag}</span>
          </article>
        ))}
      </div>
      <p className="highlights-view__next">
        Want the details?
        {' '}
        <ViewLink to="work">See the projects</ViewLink>
      </p>
    </SectionView>
  );
};
