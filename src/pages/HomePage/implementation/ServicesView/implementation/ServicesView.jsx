import { SectionView } from '../../../../../components/SectionView';
import { ViewLink } from '../../../../../components/ViewLink';
import { SERVICES, navLink } from '../../../../../constants/portfolio';
import './ServicesView.scss';

export const ServicesView = () => {
  const { label, icon } = navLink('services');

  return (
    <SectionView icon={icon} title={label} intro="What I build for teams and founders.">
      <div className="section-view__grid">
        {SERVICES.map(({ label: service, icon: serviceIcon, text }, index) => (
          <article key={service} className="section-view__card services-view__card">
            <div className="services-view__top">
              <span className="services-view__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={serviceIcon} /></svg>
              </span>
              <span className="services-view__number">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h2 className="section-view__card-title">{service}</h2>
            <p className="section-view__text">{text}</p>
          </article>
        ))}
        <article className="section-view__card services-view__card services-view__card--cta">
          <h2 className="section-view__card-title">Need one of these?</h2>
          <p className="section-view__text">Tell me about the project and I'll tell you how I'd approach it.</p>
          <ViewLink to="contact" className="services-view__cta">Get in touch</ViewLink>
        </article>
      </div>
    </SectionView>
  );
};
