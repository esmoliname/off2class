/**
 * Analytics stub (prototype scope).
 * Logs to console and keeps the last 500 events in localStorage
 * so funnel drop-off can be inspected in devtools.
 */
const STORAGE_KEY = 'verneval.events';
const MAX_EVENTS = 500;

export function track(event, props = {}) {
  const entry = {
    event,
    props,
    ts: new Date().toISOString(),
  };
  console.debug('[analytics]', event, props);
  try {
    const events = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    events.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch (e) {
    // Storage unavailable: analytics must never break the funnel.
    console.warn('[analytics] could not persist event:', e);
  }
}
