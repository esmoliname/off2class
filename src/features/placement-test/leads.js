/**
 * Lead capture persistence (localStorage-backed, prototype scope).
 */
const STORAGE_KEY = 'verneval.leads';

export function saveLead(lead) {
  const entry = {
    ...lead,
    capturedAt: new Date().toISOString(),
  };
  const leads = loadLeads();
  leads.push(entry);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    // Storage full or unavailable: keep the funnel moving, log for diagnostics.
    console.warn('[leads] could not persist lead:', e);
  }
  return entry;
}

export function loadLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
