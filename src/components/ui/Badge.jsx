import React from 'react';
import { cn } from '../../utils/cn';

const TONES = {
  cyan: 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30',
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  rose: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  slate: 'bg-white/[0.06] text-slate-300 border-white/10',
};

const SIZES = {
  xs: 'text-[10px] px-2 py-0.5',
  sm: 'text-[11px] px-2.5 py-1',
  md: 'text-xs px-3 py-1',
};

export default function Badge({
  tone = 'cyan',
  size = 'sm',
  icon: Icon,
  dot = false,
  uppercase = false,
  className,
  children,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide whitespace-nowrap',
        TONES[tone],
        SIZES[size],
        uppercase && 'uppercase',
        className
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
}
