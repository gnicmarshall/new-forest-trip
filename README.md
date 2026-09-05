# Dad's 70th — trip picker

A single-page mobile web app for choosing the weekend's itinerary as it happens.
Beaulieu, New Forest, driving down from north London.

Built with Vite + React and plain CSS. No backend, no router, no accounts.

## What it does

- Three day tabs (Saturday, Sunday, Monday), each with titled slots.
- Tap an option to pick it, tap again to un-pick. One pick per slot.
- Picks, the active day and the rain toggle persist in `localStorage`.
- Bottom bar shows a running count and opens **Your plan**, grouped by day in slot order.
- **Copy for WhatsApp** copies the plan as plain text. **Share** appears on phones that support it.
- **Clear all picks** needs two taps so it cannot be hit by accident.
- **Raining** toggle dims Outdoors options (they stay tappable).
- A hand-drawn route map for each day. Picks light up as numbered pins, the
  route follows the roads, and the key under the map jumps to each card.
- **Directions** on every card and plan row opens Apple Maps or Google Maps
  with the destination set.
- Opens on today's tab during the trip (dates are in `src/data.js`).
- Works offline once loaded (service worker, self-hosted fonts). Installable
  to the home screen.

## Run it locally

```
npm install
npm run dev
```

## Build

```
npm run build          # -> dist/  (for GitHub Pages or any static host)
npx vite build --config vite.single.config.js   # -> dist-single/index.html, one self-contained file
```

## Hosting on GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push.
It needs Pages switched on once:

1. Repo **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push (or re-run the workflow from the Actions tab).

The site will be at `https://gnicmarshall.github.io/new-forest-trip/`.

## Hosting on Firebase later

`firebase init hosting` with `dist` as the public directory and single-page
rewrites off (there is only one page). Then `npm run build && firebase deploy`.

## Editing the itinerary

Everything lives in `src/data.js`. Add or remove options freely; ids only need to
be unique. Give an option `loc: [lat, lon]` to put it on the map and `place` to
give it a Directions button. An `event` line shows as a ribbon on the card.
Picks are stored by slot id and option id, so renaming an id will drop that
pick on the next load.
