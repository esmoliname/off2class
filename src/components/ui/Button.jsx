import React from 'react';
import { cn } from '../../utils/cn';

const VARIANTS = {
  primary:
    'text-slate-950 bg-gradient-to-r from-brand-cyan via-teal-200 to-cyan-400 shadow-glow-cyan hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] font-semibold',
  secondary:
    'text-white backdrop-blur-lg bg-white/[0.06] border border-white/[0.15] hover:bg-white/[0.12] hover:border-white/[0.3]',
  purple:
    'text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-glow-purple hover:shadow-[0_0_35px_rgba(157,78,221,0.6)] font-semibold',
  danger:
    'text-white bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_0_25px_-5px_rgba(244,63,94,0.6)] hover:shadow-[0_0_35px_rgba(244,63,94,0.55)] font-semibold',
  ghost:
    'text-slate-300 bg-transparent border border-transparent hover:bg-white/[0.06] hover:text-white',
  glass:
    'text-slate-200 backdrop-blur-xl bg-white/[0.05] border border-white/[0.12] hover:border-white/30 hover:bg-white/[0.09]',
};

const SIZES = {
  xs: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  sm: 'px-4 py-2 text-xs rounded-full gap-1.5',
  md: 'px-6 py-3 text-sm rounded-full gap-2',
  lg: 'px-8 py-3.5 text-sm rounded-full gap-2',
};

/**
 * Base button of the design system.
 * `as="a"` renders an anchor (target/rel supported); defaults to <button>.
 */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  type,
  ...rest
}) {
  return (
    <Component
      type={Component === 'button' ? type || 'button' : undefined}
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090e]',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
