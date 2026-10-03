import React from 'react';
import { cn } from '../../utils/cn';

const TONES = {
  cyan: 'from-brand-cyan to-blue-500 shadow-[0_0_12px_rgba(0,240,255,0.55)]',
  emerald: 'from-emerald-400 to-teal-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
  purple: 'from-purple-400 to-indigo-500 shadow-[0_0_12px_rgba(157,78,221,0.5)]',
  amber: 'from-amber-400 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
};

const SIZES = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

/**
 * Minimalist progress bar.
 * @param {number} value 0-100
 */
export default function ProgressBar({
  value = 0,
  tone = 'cyan',
  size = 'md',
  showValue = false,
  label,
  className,
  trackClassName,
}) {
  const safe = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={cn('w-full', className)}>
      {(showValue || label) && (
        <div className="flex items-center justify-between mb-1.5 text-xs">
          {label && <span className="text-slate-300 font-medium">{label}</span>}
          {showValue && (
            <span className="font-mono font-bold text-brand-cyan">{safe}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden bg-white/[0.12] border border-white/[0.08]',
          SIZES[size],
          trackClassName
        )}
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out',
            TONES[tone]
          )}
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  );
}
