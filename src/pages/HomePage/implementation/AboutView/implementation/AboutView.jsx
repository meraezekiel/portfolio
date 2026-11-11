import { SectionView } from '../../../../../components/SectionView';
import { ViewLink } from '../../../../../components/ViewLink';
import {
  ABOUT, PORTFOLIO_CONFIG, PROJECTS, navLink,
} from '../../../../../constants/portfolio';
import portrait from '../../../../../assets/images/profile3.jpg';
import './AboutView.scss';

export const AboutView = () => {
  const { label, icon } = navLink('about');
  const { name, role, experience } = PORTFOLIO_CONFIG;
  const facts = [
    { value: experience, label: 'Years in production' },
    { value: String(PROJECTS.length), label: 'Featured projects' },
    { value: '3', label: 'Platforms: web, mobile, desktop' },
  ];

  return (
    <SectionView icon={icon} title={label} intro="Who I am and how I work.">
      <div className="about-view">
        <figure className="section-view__card about-view__portrait">
          <img src={portrait} alt={name} />
          <figcaption>
            <strong>{name}</strong>
            <span>{role}</span>
          </figcaption>
        </figure>

        <article className="section-view__card about-view__bio">
          <p className="about-view__lead">{ABOUT.lead}</p>
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph} className="section-view__text">{paragraph}</p>
          ))}
          <dl className="about-view__facts">
            {facts.map(({ value, label: factLabel }) => (
              <div key={factLabel} className="about-view__fact">
                <dt>{factLabel}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="about-view__links">
            <ViewLink to="work" className="about-view__link about-view__link--primary">See my work</ViewLink>
            <ViewLink to="contact" className="about-view__link">Contact me</ViewLink>
          </div>
        </article>
      </div>
    </SectionView>
  );
};
