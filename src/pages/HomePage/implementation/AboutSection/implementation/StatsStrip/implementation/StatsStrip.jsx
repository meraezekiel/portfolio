import { useStatsStripHandler } from './useStatsStripHandler';
import { parseStat } from './parseStat';
import { BentoTile } from '../../../../../../../components/BentoTile';
import './StatsStrip.scss';

export const StatsStrip = ({ stats }) => {
  const { stripRef } = useStatsStripHandler();

  return (
    <dl className="stats-strip" ref={stripRef}>
      {stats.map(({ value, label }) => {
        const { number, suffix } = parseStat(value);
        return (
          <BentoTile key={label} className="stats-strip__item">
            <dt className="stats-strip__label">{label}</dt>
            <dd className="stats-strip__value">
              {number !== null && <span data-count-to={number}>{number}</span>}
              {suffix}
            </dd>
          </BentoTile>
        );
      })}
    </dl>
  );
};
