import React from 'react';
import { cn } from '../../utils/cn';

const VARIANTS = {
  glass: 'liquid-glass border-white/10 specular-border',
  card: 'liquid-glass-card border-white/10 specular-border',
  panel: 'backdrop-blur-xl bg-[#0a0e17]/80 border border-white/[0.07] shadow-glass',
  feature:
    'liquid-glass border-brand-cyan/40 bg-gradient-to-r from-[#0d1424]/90 via-[#0e172a]/90 to-[#121c33]/90 specular-border shadow-[0_0_40px_rgba(0,240,255,0.12)]',
  flat: 'bg-white/[0.03] border border-white/[0.07]',
};

const ROUNDED = {
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
};

/**
 * Glass surface wrapper. `hover` only applies to interactive-looking variants.
 */
export default function Card({
  as: Component = 'div',
  variant = 'card',
  rounded = 'xl',
  hover = false,
  className,
  children,
  ...rest
}) {
  return (
    <Component
      className={cn(
        'relative',
        VARIANTS[variant],
        ROUNDED[rounded],
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.28] hover:shadow-glass-hover',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
