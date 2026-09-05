import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { trip, totalSlots } from './data.js';
import { useLocalStorage } from './useLocalStorage.js';
import { DayTabs } from './components/DayTabs.jsx';
import { Slot } from './components/Slot.jsx';
import { PlanSheet } from './components/PlanSheet.jsx';

const KEYS = { picks: 'dad70.picks', day: 'dad70.day', rain: 'dad70.rain' };
const validSlotIds = new Set(trip.days.flatMap((d) => d.slots.map((s) => s.id)));

export default function App() {
  const [rawPicks, setPicks] = useLocalStorage(KEYS.picks, {});
  const [activeDay, setActiveDay] = useLocalStorage(KEYS.day, trip.days[0].id);
  const [raining, setRaining] = useLocalStorage(KEYS.rain, false);
  const [planOpen, setPlanOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const mainRef = useRef(null);

  // Ignore anything stale in storage that no longer matches the data.
  const picks = useMemo(() => {
    const clean = {};
    for (const [slotId, optId] of Object.entries(rawPicks || {})) {
      if (validSlotIds.has(slotId) && typeof optId === 'string') clean[slotId] = optId;
    }
    return clean;
  }, [rawPicks]);

  const day = trip.days.find((d) => d.id === activeDay) || trip.days[0];
  const pickedCount = Object.keys(picks).length;
  const counts = useMemo(() => {
    const out = {};
    for (const d of trip.days) {
      out[d.id] = { picked: d.slots.filter((s) => picks[s.id]).length, total: d.slots.length };
    }
    return out;
  }, [picks]);

  const onPick = useCallback(
    (slotId, optionId) => {
      setPicks((prev) => {
        const next = { ...(prev || {}) };
        if (next[slotId] === optionId) delete next[slotId];
        else next[slotId] = optionId;
        return next;
      });
    },
    [setPicks]
  );

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  }, []);

  function changeDay(id) {
    setActiveDay(id);
    window.scrollTo({ top: 0 });
  }

  const closePlan = useCallback(() => setPlanOpen(false), []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  return (
    <>
      <header className="masthead">
        <div className="masthead-text">
          <h1 className="title">{trip.title}</h1>
          <p className="subtitle">{trip.subtitle}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={raining}
          className={`rain${raining ? ' is-on' : ''}`}
          onClick={() => setRaining((v) => !v)}
        >
          <span className="rain-icon" aria-hidden="true">
            {raining ? '🌧' : '☀️'}
          </span>
          <span className="rain-label">Raining</span>
        </button>
      </header>

      <DayTabs days={trip.days} activeId={day.id} counts={counts} onChange={changeDay} />

      <main
        className="day"
        id={`panel-${day.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${day.id}`}
        ref={mainRef}
      >
        <p className="day-note">{day.note}</p>
        {day.slots.map((slot) => (
          <Slot key={slot.id} slot={slot} pickedId={picks[slot.id]} raining={raining} onPick={onPick} />
        ))}
        {raining && (
          <p className="rain-note">Outdoors options are dimmed because it is raining. They still work if you tap them.</p>
        )}
      </main>

      <div className="bottombar">
        <p className="bottombar-count" aria-live="polite">
          <strong>{pickedCount}</strong> of {totalSlots} picked
        </p>
        <button type="button" className="btn btn-primary" onClick={() => setPlanOpen(true)}>
          Your plan
        </button>
      </div>

      <PlanSheet
        open={planOpen}
        picks={picks}
        pickedCount={pickedCount}
        totalSlots={totalSlots}
        onClose={closePlan}
        onClear={() => setPicks({})}
        onToast={showToast}
      />

      <div className="toast-region" role="status" aria-live="polite">
        {toast && <p className="toast">{toast}</p>}
      </div>
    </>
  );
}
