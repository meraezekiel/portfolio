import './MarqueeRow.scss';

export const MarqueeRow = ({ label, items, reverse = false }) => (
  <div className={`marquee-row${reverse ? ' marquee-row--reverse' : ''}`}>
    <span className="marquee-row__label">{label}</span>
    <div className="marquee-row__viewport">
      <ul className="marquee-row__track" aria-label={`${label} skills`}>
        {items.map((item) => (
          <li key={item} className="marquee-row__item">{item}</li>
        ))}
        {items.map((item) => (
          <li key={`${item}-copy`} className="marquee-row__item marquee-row__item--copy" aria-hidden="true">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
