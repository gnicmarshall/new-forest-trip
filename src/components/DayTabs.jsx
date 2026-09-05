import { useRef } from 'react';

export function DayTabs({ days, activeId, counts, onChange }) {
  const refs = useRef([]);

  function onKeyDown(e, index) {
    const last = days.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    onChange(days[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div className="tabs" role="tablist" aria-label="Days">
      {days.map((day, i) => {
        const active = day.id === activeId;
        const { picked, total } = counts[day.id];
        return (
          <button
            key={day.id}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`tab-${day.id}`}
            aria-selected={active}
            aria-controls={`panel-${day.id}`}
            tabIndex={active ? 0 : -1}
            className={`tab${active ? ' is-active' : ''}`}
            onClick={() => onChange(day.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="tab-label">{day.label}</span>
            <span className="tab-count" aria-label={`${picked} of ${total} picked`}>
              {picked}/{total}
            </span>
          </button>
        );
      })}
    </div>
  );
}
