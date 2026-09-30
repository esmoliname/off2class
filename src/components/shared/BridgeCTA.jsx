import React from 'react';
import { ExternalLink } from 'lucide-react';
import { OFF2CLASS_WHITELABEL_URL } from '../../utils/constants';
import { track } from '../../features/analytics/track';

/**
 * Build the whitelabel URL with lesson + attribution params.
 * Exported so imperative flows (e.g. "Lanzar Lección") share the same destination.
 */
export function buildBridgeUrl({ lessonCode, source }) {
  try {
    const url = new URL(OFF2CLASS_WHITELABEL_URL);
    if (lessonCode) url.searchParams.set('lesson', lessonCode);
    url.searchParams.set('source', source || 'unknown');
    url.searchParams.set('utm_source', 'verneval_web');
    return url.toString();
  } catch {
    return OFF2CLASS_WHITELABEL_URL;
  }
}

/** Imperative variant for flows that open a new tab after a UI transition. */
export function openBridge({ lessonCode, source }) {
  track('bridge_click', { source, lessonCode });
  window.open(
    buildBridgeUrl({ lessonCode, source }),
    '_blank',
    'noopener,noreferrer'
  );
}

const VARIANTS = {
  // Hero-sized CTA (dashboard bridge)
  primary:
    'btn-liquid-primary !py-4 !px-8 text-base font-bold shadow-[0_0_35px_rgba(0,240,255,0.5)] hover:scale-[1.02] transition-transform',
  // Card-level CTA (landing methodology card)
  inline: 'btn-liquid-primary !w-full !py-2.5 text-xs',
  // Compact navbar ghost button
  nav: 'hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.1] hover:border-brand-cyan/50 hover:text-brand-cyan transition-all',
  // Bare inline link (footer lists)
  bare: 'inline-flex items-center gap-1 hover:text-brand-cyan transition-colors',
};

const LABELS = {
  primary: 'Acceder a mi Aula Virtual / Off2Class',
  inline: 'Probar Conexión Off2Class Whitelabel',
  nav: 'Aula Virtual',
  bare: 'Aula Virtual Whitelabel',
};

/**
 * The ONLY component that navigates to the external Off2Class classroom.
 * Every entry point must use it so destination + attribution stay consistent.
 */
export default function BridgeCTA({
  variant = 'primary',
  lessonCode,
  source,
  label,
  className = '',
  showDestination = false,
}) {
  const href = buildBridgeUrl({ lessonCode, source });

  return (
    <div className={showDestination ? 'flex flex-col items-center lg:items-end gap-2 shrink-0' : 'contents'}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('bridge_click', { source, lessonCode })}
        className={`${VARIANTS[variant]} ${variant === 'primary' ? 'group/btn' : 'group'} ${className}`}
      >
        <span>{label || LABELS[variant]}</span>
        <ExternalLink
          className={`transition-transform ${
            variant === 'primary'
              ? 'w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1'
              : variant === 'bare'
              ? 'w-3 h-3'
              : 'w-3.5 h-3.5'
          }`}
        />
      </a>
      {showDestination && (
        <span className="text-[11px] text-slate-300 font-mono">
          Destino: {OFF2CLASS_WHITELABEL_URL}
        </span>
      )}
    </div>
  );
}
