import { TOOLS } from '../../../../../constants/portfolio';
import './ToolsStrip.scss';

export const ToolsStrip = () => (
  <div className="tools-strip">
    <div className="tools-strip__intro">
      <span className="tools-strip__eyebrow">DAILY DRIVERS</span>
      <span className="tools-strip__title">Tools I work with</span>
    </div>
    <div className="tools-strip__window">
      <div className="tools-strip__track">
        {[...TOOLS, ...TOOLS].map(({ name, color, mark }, index) => (
          <span key={`${name}-${index}`} className="tools-strip__tool" aria-hidden={index >= TOOLS.length}>
            <span className="tools-strip__mark" style={{ background: color }}>{mark}</span>
            {name}
          </span>
        ))}
      </div>
    </div>
  </div>
);
