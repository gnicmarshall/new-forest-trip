import { OptionCard } from './OptionCard.jsx';
import { ROMAN } from '../nav.js';

export function Slot({ slot, index, pickedId, raining, onPick }) {
  const chosen = slot.options.find((o) => o.id === pickedId);
  return (
    <section className="slot" aria-labelledby={`slot-${slot.id}`}>
      <header className="slot-head">
        <h2 className="slot-title" id={`slot-${slot.id}`}>
          <span className="slot-num" aria-hidden="true">
            {ROMAN[index]}
          </span>
          <span className="sr-only">Part {index + 1}. </span>
          {slot.title}
        </h2>
        {chosen ? (
          <p className="slot-status is-chosen">
            <span className="slot-status-mark" aria-hidden="true">
              ✓
            </span>
            {chosen.name}
          </p>
        ) : slot.pick ? (
          <p className="slot-status">{slot.pick}</p>
        ) : null}
      </header>
      <ul className="options">
        {slot.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={option.id === pickedId}
            dimmed={raining && option.cover === 'Outdoors'}
            onToggle={() => onPick(slot.id, option.id)}
          />
        ))}
      </ul>
    </section>
  );
}
