/** Directions link that opens the phone's maps app with the destination set. */
export function directionsUrl(place) {
  if (!place) return null;
  const q = encodeURIComponent(place);
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const apple = /iPhone|iPad|iPod|Macintosh/.test(ua);
  return apple
    ? `https://maps.apple.com/?daddr=${q}&dirflg=d`
    : `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=driving`;
}

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
