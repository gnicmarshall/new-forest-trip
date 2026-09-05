import { useMemo } from 'react';
import { trip } from '../data.js';
import { ROMAN } from '../nav.js';

/* A stylised itinerary map: London to the New Forest, drawn like an old
   county map. Everything is [lat, lon]; project() turns it into SVG space. */
const LON = [-1.95, -0.05];
const LAT = [50.57, 51.62];
export const MW = 375;
export const MH = 330;

const project = ([lat, lon]) => [
  ((lon - LON[0]) / (LON[1] - LON[0])) * MW,
  ((LAT[1] - lat) / (LAT[1] - LAT[0])) * MH,
];
const P = (pt) => project(pt).map((n) => n.toFixed(1)).join(' ');
const path = (pts, close = false) =>
  pts.map((p, i) => (i ? 'L' : 'M') + P(p)).join(' ') + (close ? ' Z' : '');

const COAST = [
  [50.72, -1.95], [50.72, -1.74], [50.705, -1.55], [50.745, -1.53], [50.77, -1.45], [50.78, -1.39],
  [50.82, -1.31], [50.86, -1.34], [50.895, -1.40], [50.90, -1.36], [50.855, -1.31], [50.82, -1.25],
  [50.80, -1.20], [50.79, -1.13], [50.79, -1.09], [50.79, -1.03], [50.78, -0.97], [50.80, -0.90],
  [50.75, -0.80], [50.72, -0.78], [50.78, -0.60], [50.78, -0.05],
];
const LAND = [...COAST, [51.62, -0.05], [51.62, -1.95]];
const WIGHT = [
  [50.665, -1.59], [50.685, -1.54], [50.705, -1.50], [50.765, -1.30], [50.73, -1.16], [50.69, -1.07],
  [50.65, -1.15], [50.595, -1.21], [50.575, -1.30], [50.62, -1.42], [50.665, -1.51],
];

const MOTORWAYS = [
  // M3
  [[51.556, -0.178], [51.42, -0.42], [51.34, -0.62], [51.30, -0.85], [51.26, -1.09], [51.19, -1.23], [51.09, -1.31], [51.02, -1.31], [50.94, -1.40]],
  // M27 / A31
  [[50.85, -1.09], [50.88, -1.25], [50.94, -1.40], [50.93, -1.52], [50.92, -1.58], [50.88, -1.70], [50.85, -1.79], [50.78, -1.90]],
];
const ROADS = [
  // A3
  [[51.556, -0.178], [51.40, -0.30], [51.28, -0.50], [51.22, -0.60], [51.14, -0.72], [51.07, -0.85], [51.00, -0.935], [50.96, -0.977], [50.87, -1.05], [50.81, -1.09]],
  // A303 to Salisbury
  [[51.19, -1.23], [51.21, -1.48], [51.19, -1.70], [51.17, -1.78], [51.09, -1.80], [51.07, -1.80]],
  // A36 Salisbury to Southampton
  [[51.07, -1.80], [51.03, -1.62], [50.99, -1.50], [50.95, -1.42], [50.94, -1.40]],
  // A27 east to Chichester, A286 up to Singleton
  [[50.85, -1.09], [50.85, -0.90], [50.84, -0.78], [50.909, -0.755]],
  // A35 Lyndhurst to Christchurch
  [[50.873, -1.577], [50.83, -1.70], [50.75, -1.74]],
  // A3(M) into the M27 at Portsmouth
  [[50.81, -1.09], [50.85, -1.09]],
];
const LANES = [
  // A337 Cadnam, Lyndhurst, Brockenhurst, Lymington
  [[50.92, -1.58], [50.873, -1.577], [50.818, -1.574], [50.76, -1.54]],
  // B3056 Lyndhurst to Beaulieu, on to Buckler's Hard
  [[50.873, -1.577], [50.84, -1.50], [50.818, -1.452], [50.80, -1.421]],
  // B3054 Lymington to Beaulieu
  [[50.76, -1.54], [50.79, -1.50], [50.818, -1.452]],
  // Rhinefield and Bolderwood drives
  [[50.818, -1.574], [50.825, -1.62], [50.85, -1.66], [50.876, -1.68]],
  // Beaulieu to Exbury
  [[50.818, -1.452], [50.799, -1.398]],
];

/* Road network as a graph, so the route ribbon follows the drawn roads. */
const GRAPH = (() => {
  const nodes = [];
  const key = (x, y) => {
    for (let i = 0; i < nodes.length; i++) {
      if (Math.hypot(nodes[i].x - x, nodes[i].y - y) < 3) return i;
    }
    nodes.push({ x, y, edges: [] });
    return nodes.length - 1;
  };
  for (const line of [...MOTORWAYS, ...ROADS, ...LANES]) {
    let prev = null;
    for (const pt of line) {
      const [x, y] = project(pt);
      const i = key(x, y);
      if (prev !== null && prev !== i) {
        const d = Math.hypot(nodes[prev].x - x, nodes[prev].y - y);
        nodes[prev].edges.push([i, d]);
        nodes[i].edges.push([prev, d]);
      }
      prev = i;
    }
  }
  return nodes;
})();

function nearestNode([x, y]) {
  let best = 0;
  let bd = Infinity;
  GRAPH.forEach((n, i) => {
    const d = Math.hypot(n.x - x, n.y - y);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  return best;
}

function shortest(a, b) {
  const dist = new Array(GRAPH.length).fill(Infinity);
  const prev = new Array(GRAPH.length).fill(-1);
  const done = new Array(GRAPH.length).fill(false);
  dist[a] = 0;
  for (;;) {
    let u = -1;
    for (let i = 0; i < GRAPH.length; i++) if (!done[i] && (u === -1 || dist[i] < dist[u])) u = i;
    if (u === -1 || dist[u] === Infinity || u === b) break;
    done[u] = true;
    for (const [v, w] of GRAPH[u].edges) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
      }
    }
  }
  const out = [];
  for (let v = b; v !== -1; v = prev[v]) out.unshift(v);
  return out[0] === a ? out : [a, b];
}

/** Road-following polyline through a list of projected stops. */
function roadPath(stops) {
  const d = [];
  for (let i = 0; i < stops.length; i++) {
    const [x, y] = stops[i];
    const n = nearestNode(stops[i]);
    if (i === 0) d.push(`M${x.toFixed(1)} ${y.toFixed(1)}`);
    else {
      const prevN = nearestNode(stops[i - 1]);
      for (const idx of shortest(prevN, n)) d.push(`L${GRAPH[idx].x.toFixed(1)} ${GRAPH[idx].y.toFixed(1)}`);
      d.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    if (i === 0) d.push(`L${GRAPH[n].x.toFixed(1)} ${GRAPH[n].y.toFixed(1)}`);
  }
  return d.join(' ');
}

const TOWNS = [
  ['Guildford', [51.236, -0.57]],
  ['Basingstoke', [51.266, -1.088]],
  ['Winchester', [51.061, -1.31]],
  ['Salisbury', [51.07, -1.795]],
  ['Petersfield', [51.004, -0.935]],
  ['Portsmouth', [50.805, -1.087]],
  ['Southampton', [50.905, -1.404]],
  ['Lyndhurst', [50.873, -1.577]],
  ['Lymington', [50.758, -1.541]],
  ['Chichester', [50.837, -0.78]],
];

const TREES = (() => {
  let s = 11;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const out = [];
  for (let i = 0; i < 18; i++) out.push([50.80 + rnd() * 0.13, -1.77 + rnd() * 0.17]);
  return out;
})();

function Tree({ pt }) {
  const [x, y] = project(pt);
  return (
    <path
      d={`M${x - 2.6} ${y + 1.5} L${x} ${y - 4} L${x + 2.6} ${y + 1.5} Z M${x} ${y + 1.5} v2.2`}
      className="m-tree"
    />
  );
}

function Compass({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} className="m-compass" aria-hidden="true">
      <circle r="17" />
      <circle r="3" />
      <path d="M0 -15 L3 0 L0 15 L-3 0 Z" className="m-compass-n" />
      <path d="M-15 0 L0 3 L15 0 L0 -3 Z" />
      <path d="M-9 -9 L0 -2 L9 9 L0 2 Z M9 -9 L2 0 L-9 9 L-2 0 Z" className="m-compass-x" />
      <text y="-20" textAnchor="middle" className="m-compass-t">N</text>
    </g>
  );
}

function Tower({ pt }) {
  const [x, y] = project(pt);
  return (
    <path
      className="m-glyph"
      d={`M${x - 4} ${y + 4} v-8 h2 v-2 h1.5 v2 h1 v-2 h1.5 v2 h2 v8 Z`}
    />
  );
}

function Abbey({ pt }) {
  const [x, y] = project(pt);
  return (
    <path
      className="m-glyph"
      d={`M${x - 5} ${y + 3} v-5 l5 -4 l5 4 v5 Z M${x} ${y - 6} v-3 M${x - 1.5} ${y - 7.5} h3`}
    />
  );
}

export function dayKey(day, picks) {
  return day.slots
    .map((slot, i) => {
      const o = slot.options.find((x) => x.id === picks[slot.id]);
      return o ? { numeral: ROMAN[i], option: o } : null;
    })
    .filter(Boolean);
}

export function RouteMap({ day, picks, onMarkerTap }) {
  const start = trip[day.from];
  const end = trip[day.to];

  const { markers, route } = useMemo(() => {
    // Pins within a few pixels of each other (Butser and its pub, the hotel
    // options) merge into one so nothing sits on top of anything else.
    const clusters = [];
    const orderByOption = {};
    day.slots.forEach((slot, si) => {
      slot.options.forEach((o) => {
        if (!o.loc) return;
        if (picks[slot.id] === o.id) orderByOption[o.id] = si;
        const [x, y] = project(o.loc);
        let c = clusters.find((k) => Math.hypot(k.x - x, k.y - y) < 16);
        if (!c) {
          c = { x, y, loc: o.loc, options: [] };
          clusters.push(c);
        }
        c.options.push(o);
      });
    });
    const markers = clusters
      .map((c) => {
        const selected = c.options.filter((o) => orderByOption[o.id] !== undefined);
        const lead = selected[0] || null;
        return { ...c, selected: lead, order: lead ? orderByOption[lead.id] : null, first: lead || c.options[0] };
      })
      // Chosen pins draw last so they sit on top and always take the tap.
      .sort((a, b) => (a.selected ? 1 : 0) - (b.selected ? 1 : 0));
    const pts = [start.loc];
    day.slots.forEach((slot) => {
      const o = slot.options.find((x) => x.id === picks[slot.id]);
      if (o && o.loc && o.loc.join() !== pts[pts.length - 1].join()) pts.push(o.loc);
    });
    if (end.loc.join() !== pts[pts.length - 1].join()) pts.push(end.loc);
    return { markers, route: roadPath(pts.map(project)) };
  }, [day, picks, start, end]);

  const [sx, sy] = project(trip.start.loc);
  const [bx, by] = project(trip.base.loc);

  return (
    <svg
      className="m"
      viewBox={`0 0 ${MW} ${MH}`}
      role="img"
      aria-label={`Map of the ${day.label} route from ${start.name} to ${end.name}`}
    >
      <defs>
        <pattern id="sea" width="14" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3 q3.5 -2.5 7 0 t7 0" className="m-wave" />
        </pattern>
      </defs>

      <rect width={MW} height={MH} className="m-sea" />
      <rect width={MW} height={MH} fill="url(#sea)" />
      <path d={path(LAND, true)} className="m-land" />
      <path d={path(WIGHT, true)} className="m-land" />

      <g className="m-forest">
        {TREES.map((t, i) => (
          <Tree key={i} pt={t} />
        ))}
      </g>

      {MOTORWAYS.map((r, i) => (
        <g key={`m${i}`}>
          <path d={path(r)} className="m-mway-outer" />
          <path d={path(r)} className="m-mway-inner" />
        </g>
      ))}
      {ROADS.map((r, i) => (
        <path key={`a${i}`} d={path(r)} className="m-road" />
      ))}
      {LANES.map((r, i) => (
        <path key={`l${i}`} d={path(r)} className="m-lane" />
      ))}

      <g className="m-labels">
        {TOWNS.map(([name, pt]) => {
          const [x, y] = project(pt);
          return (
            <g key={name}>
              <circle cx={x} cy={y} r="1.8" className="m-town" />
              <text x={x + 4} y={y - 3} className="m-town-t">{name}</text>
            </g>
          );
        })}
        <text x={project([50.965, -1.72])[0]} y={project([50.965, -1.72])[1]} className="m-region" textAnchor="middle">New Forest</text>
        <text x={project([50.66, -1.30])[0]} y={project([50.66, -1.30])[1]} className="m-water" textAnchor="middle">Isle of Wight</text>
        <text x={project([50.60, -0.98])[0]} y={project([50.60, -0.98])[1]} className="m-water" textAnchor="middle">The Channel</text>
        <text x={project([51.50, -0.60])[0]} y={project([51.50, -0.60])[1]} className="m-region" textAnchor="middle">London</text>
      </g>

      <Compass x={42} y={58} />

      <g className="m-cartouche" transform={`translate(${MW - 8} ${MH - 8})`}>
        <rect x="-140" y="-40" width="140" height="40" />
        <text x="-70" y="-24" textAnchor="middle" className="m-cart-t">The road to Beaulieu</text>
        <text x="-70" y="-9" textAnchor="middle" className="m-cart-s">September MMXXVI</text>
      </g>
      <g className="m-scale" transform={`translate(10 ${MH - 12})`}>
        <path d="M0 0 h45 M0 -3 v6 M45 -3 v6" />
        <text x="22.5" y="-6" textAnchor="middle">10 miles</text>
      </g>

      <path d={route} className="m-route" />

      <Tower pt={trip.start.loc} />
      <text x={sx - 10} y={sy + 4} textAnchor="end" className="m-place">{trip.start.name}</text>
      <Abbey pt={[trip.base.loc[0] + 0.032, trip.base.loc[1] + 0.04]} />
      <text x={bx + 20} y={by - 6} textAnchor="start" className="m-place">{trip.base.name}</text>

      {markers.map((m) => {
        const { x, y } = m;
        const sel = !!m.selected;
        return (
          <g
            key={m.loc.join(',')}
            className={`m-marker${sel ? ' is-selected' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`${m.first.name}${sel ? ', chosen' : ''}. Show the card.`}
            onClick={() => onMarkerTap(m.first.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onMarkerTap(m.first.id);
              }
            }}
          >
            <circle cx={x} cy={y} r="13" className="m-hit" />
            <circle cx={x} cy={y} r={sel ? 9 : 5.5} className="m-pin" />
            {sel && (
              <text x={x} y={y + 3.2} textAnchor="middle" className="m-pin-t">{ROMAN[m.order]}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
