export function OptionCard({ option, selected, dimmed, onToggle }) {
  const nameId = `${option.id}-name`;
  const descId = `${option.id}-desc`;
  return (
    <li className="option">
      <button
        type="button"
        className={`card${selected ? ' is-selected' : ''}${dimmed ? ' is-dimmed' : ''}`}
        aria-pressed={selected}
        aria-labelledby={nameId}
        aria-describedby={descId}
        onClick={onToggle}
      >
        <span className="card-top">
          <span className="card-name" id={nameId}>
            {option.name}
          </span>
          <span className="card-check" aria-hidden="true">
            {selected ? '✓' : ''}
          </span>
        </span>
        <span className="card-body" id={descId}>
          <span className="card-meta">{option.meta}</span>
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
    </li>
  );
}
