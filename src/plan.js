import { trip } from './data.js';

/** Chosen options grouped by day, in slot order. Days with no picks are kept (empty). */
export function buildPlan(picks) {
  return trip.days.map((day) => ({
    day,
    items: day.slots
      .map((slot) => {
        const option = slot.options.find((o) => o.id === picks[slot.id]);
        return option ? { slot, option } : null;
      })
      .filter(Boolean),
  }));
}

/** Plain text for pasting into WhatsApp. */
export function planToText(picks) {
  const plan = buildPlan(picks);
  const lines = [`${trip.title}: ${trip.subtitle}`];
  let any = false;
  for (const { day, items } of plan) {
    if (items.length === 0) continue;
    any = true;
    lines.push('', day.label.toUpperCase());
    for (const { slot, option } of items) {
      lines.push(`• ${slot.title}: ${option.name} (${option.meta})`);
    }
  }
  if (!any) lines.push('', 'Nothing picked yet.');
  return lines.join('\n');
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
