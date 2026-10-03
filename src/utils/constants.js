/**
 * Application constants & configuration.
 * URLs + non-visual app-level flags only.
 */

// External Whitelabel Redirection URL.
// TODO: replace with the real school/university white-label subdomain
// (e.g. https://tu-escuela.off2class.com) — NOT the generic app.off2class.com login.
export const OFF2CLASS_WHITELABEL_URL = 'https://app.off2class.com';

// TODO: replace with a real Calendly event-type URL
// (e.g. https://calendly.com/tu-escuela/asesoria-20min) — the bare calendly.com
// domain is the marketing home and dead-ends the booking funnel.
export const CALENDLY_BOOKING_URL = 'https://calendly.com';

/** Application views handled by the state router in App.jsx */
export const VIEWS = {
  LANDING: 'landing',
  CATALOG: 'catalog',
  EXAM: 'exam',
  CLASSROOM: 'classroom',
  DASHBOARD: 'dashboard',
};
