import { useEffect, useRef, useState } from 'react';
import { buildPlan, planToText, copyText } from '../plan.js';
import { directionsUrl, ROMAN } from '../nav.js';

export function PlanSheet({ open, picks, pickedCount, totalSlots, onClose, onClear, onToast }) {
  const closeRef = useRef(null);
  const sheetRef = useRef(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  useEffect(() => {
    if (!open) return;
    setConfirmClear(false);
    const prev = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !sheetRef.current) return;
      const focusables = sheetRef.current.querySelectorAll(
        'button:not([disabled]), [href], summary, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const plan = buildPlan(picks);
  const text = planToText(picks);

  async function onCopy() {
    const ok = await copyText(text);
    onToast(ok ? 'Copied. Paste it into WhatsApp.' : 'Could not copy. Open "Show as text" and long-press it.');
  }

  async function onShare() {
    try {
      await navigator.share({ title: 'Our plan', text });
    } catch (err) {
      if (err && err.name === 'AbortError') return;
      onCopy();
    }
  }

  function onClearTap() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    onClear();
    setConfirmClear(false);
    onToast('All picks cleared.');
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-title"
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sheet-head">
          <div>
            <h2 className="sheet-title" id="plan-title">
              Your plan
            </h2>
            <p className="sheet-sub">
              {pickedCount} of {totalSlots} picked
            </p>
          </div>
          <button type="button" className="btn btn-ghost" ref={closeRef} onClick={onClose}>
            Close
          </button>
        </header>

        <div className="sheet-body">
          {pickedCount === 0 ? (
            <p className="empty">Nothing picked yet. Tap an option on any day and it will appear here.</p>
          ) : (
            plan.map(({ day, items }) => (
              <section key={day.id} className="plan-day" aria-labelledby={`plan-${day.id}`}>
                <h3 className="plan-day-title" id={`plan-${day.id}`}>
                  {day.label}
                </h3>
                {items.length === 0 ? (
                  <p className="plan-empty">Nothing picked yet</p>
                ) : (
                  <ol className="plan-list">
                    {items.map(({ slot, option }) => {
                      const nav = directionsUrl(option.place);
                      const index = day.slots.indexOf(slot);
                      return (
                        <li key={slot.id} className="plan-item">
                          <span className="plan-num" aria-hidden="true">
                            {ROMAN[index]}
                          </span>
                          <span className="plan-text">
                            <span className="plan-slot">{slot.title}</span>
                            <span className="plan-name">{option.name}</span>
                            <span className="plan-meta">{option.meta}</span>
                          </span>
                          {nav && (
                            <a className="plan-nav" href={nav} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${option.name}`}>
                              <span aria-hidden="true">➶</span>
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                )}
              </section>
            ))
          )}
          <details className="plan-raw">
            <summary>Show as text</summary>
            <pre>{text}</pre>
          </details>
        </div>

        <footer className="sheet-foot">
          <button type="button" className="btn btn-primary" onClick={onCopy} disabled={pickedCount === 0}>
            Copy for WhatsApp
          </button>
          {canShare && (
            <button type="button" className="btn" onClick={onShare} disabled={pickedCount === 0}>
              Share
            </button>
          )}
          <button
            type="button"
            className={`btn btn-danger${confirmClear ? ' is-armed' : ''}`}
            onClick={onClearTap}
            onBlur={() => setConfirmClear(false)}
            disabled={pickedCount === 0}
          >
            {confirmClear ? 'Tap again to clear everything' : 'Clear all picks'}
          </button>
        </footer>
      </div>
    </div>
  );
}
