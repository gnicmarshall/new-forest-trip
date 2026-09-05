import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { trip, totalSlots } from './data.js';
import { useLocalStorage } from './useLocalStorage.js';
import { DayTabs } from './components/DayTabs.jsx';
import { Slot } from './components/Slot.jsx';
import { PlanSheet } from './components/PlanSheet.jsx';
import { RouteMap, dayKey } from './components/RouteMap.jsx';

const KEYS = { picks: 'dad70.picks', day: 'dad70.day2', rain: 'dad70.rain', map: 'dad70.map' };
const validSlotIds = new Set(trip.days.flatMap((d) => d.slots.map((s) => s.id)));

function localDate() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function App() {
  const today = localDate();
  const todayId = (trip.days.find((d) => d.date === today) || {}).id || null;

  const [rawPicks, setPicks] = useLocalStorage(KEYS.picks, {});
  // Remember the open day, but on a new calendar day jump to today's tab.
  const [dayPref, setDayPref] = useLocalStorage(KEYS.day, null);
  const [raining, setRaining] = useLocalStorage(KEYS.rain, false);
  const [mapOpen, setMapOpen] = useLocalStorage(KEYS.map, true);
  const [planOpen, setPlanOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  const picks = useMemo(() => {
    const clean = {};
    for (const [slotId, optId] of Object.entries(rawPicks || {})) {
      if (validSlotIds.has(slotId) && typeof optId === 'string') clean[slotId] = optId;
    }
    return clean;
  }, [rawPicks]);

  const activeDayId =
    dayPref && dayPref.on === today && trip.days.some((d) => d.id === dayPref.id)
      ? dayPref.id
      : todayId || trip.days[0].id;
  const day = trip.days.find((d) => d.id === activeDayId);

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
    setDayPref({ id, on: today });
    window.scrollTo({ top: 0 });
  }

  const onMarkerTap = useCallback((optionId) => {
    const el = document.getElementById(`card-${optionId}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.remove('is-flash');
    void el.offsetWidth;
    el.classList.add('is-flash');
    setTimeout(() => el.classList.remove('is-flash'), 1400);
  }, []);

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
      <div className="ornament" aria-hidden="true">
        <span className="ornament-line" />
        <span className="ornament-mark">✦</span>
        <span className="ornament-line" />
      </div>

      <DayTabs days={trip.days} activeId={day.id} todayId={todayId} counts={counts} onChange={changeDay} />

      <main className="day" id={`panel-${day.id}`} role="tabpanel" aria-labelledby={`tab-${day.id}`}>
        <p className="day-note">{day.note}</p>

        <section className="map-wrap" aria-label="Route map">
          {mapOpen && (
            <figure className="map">
              <RouteMap day={day} picks={picks} onMarkerTap={onMarkerTap} />
              <figcaption className="map-cap">
                {dayKey(day, picks).length === 0 ? (
                  <p className="map-cap-empty">Pick something below and the route draws itself. Tap a pin to jump to its card.</p>
                ) : (
                  <ol className="map-key" aria-label="Your route today">
                    {dayKey(day, picks).map(({ numeral, option }) => (
                      <li key={option.id}>
                        <button type="button" className="map-key-item" onClick={() => onMarkerTap(option.id)}>
                          <span className="map-key-num" aria-hidden="true">{numeral}</span>
                          <span className="map-key-name">{option.name}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                )}
              </figcaption>
            </figure>
          )}
          <button type="button" className="map-toggle" aria-expanded={mapOpen} onClick={() => setMapOpen((v) => !v)}>
            {mapOpen ? 'Hide the map' : 'Show the map'}
          </button>
        </section>

        {day.slots.map((slot, i) => (
          <Slot key={slot.id} slot={slot} index={i} pickedId={picks[slot.id]} raining={raining} onPick={onPick} />
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
