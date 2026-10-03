import React from 'react';
import { cn } from '../../utils/cn';

const TONES = {
  cyan: 'ambient-glow-cyan',
  purple: 'ambient-glow-purple',
  blue: 'ambient-glow-blue',
};

/** Decorative ambient light blob. Always `pointer-events-none`. */
export default function AmbientGlow({ tone = 'cyan', className }) {
  return <div aria-hidden className={cn(TONES[tone], 'pointer-events-none', className)} />;
}
