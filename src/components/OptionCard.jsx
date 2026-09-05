import { directionsUrl } from '../nav.js';

export function OptionCard({ option, selected, dimmed, onToggle }) {
  const nameId = `${option.id}-name`;
  const descId = `${option.id}-desc`;
  const nav = directionsUrl(option.place);
  return (
    <li className="option">
      <article
        id={`card-${option.id}`}
        className={`card${selected ? ' is-selected' : ''}${dimmed ? ' is-dimmed' : ''}`}
      >
        <button
          type="button"
          className="card-main"
          aria-pressed={selected}
          aria-labelledby={nameId}
          aria-describedby={descId}
          onClick={onToggle}
        >
          <span className="card-top">
            <span className="card-name" id={nameId}>
              {option.name}
            </span>
            <span className="card-seal" aria-hidden="true">
              {selected ? '✓' : ''}
            </span>
          </span>
          <span className="card-body" id={descId}>
            <span className="card-meta">{option.meta}</span>
            {option.event && (
              <span className="card-event">
                <span aria-hidden="true">✦ </span>
                {option.event}
              </span>
            )}
            <span className="card-why">{option.why}</span>
            <span className="card-access">
              <span className="card-access-label">Access</span>
              {option.access}
            </span>
            <span className="card-foot">
              <span className={`tag tag-${option.cover.toLowerCase()}`}>{option.cover}</span>
              <span className="tag">{option.cost}</span>
              {option.best && <span className="card-best">My pick</span>}
            </span>
          </span>
        </button>
        {nav && (
          <a className="card-nav" href={nav} target="_blank" rel="noopener noreferrer">
            Directions
            <span aria-hidden="true"> ➶</span>
          </a>
        )}
      </article>
    </li>
  );
}
