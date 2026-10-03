import React from 'react';
import { Sparkles } from 'lucide-react';
import { BRAND_MARKS } from '../../assets/brands';
import { cn } from '../../utils/cn';

const BRAND_TONES = {
  ielts: 'from-blue-500/30 to-cyan-400/20 text-blue-300 border-blue-400/40',
  toefl: 'from-purple-500/30 to-indigo-400/20 text-purple-300 border-purple-400/40',
  cambridge: 'from-emerald-500/30 to-teal-400/20 text-emerald-300 border-emerald-400/40',
  duolingo: 'from-lime-400/30 to-emerald-400/20 text-lime-300 border-lime-400/40',
};

/**
 * Brand / icon container with an interactive glow on hover
 * (the mark floats on a frosted tile that lights up under the cursor).
 */
export default function ExamBadge({ brand, Icon, size = 'lg', className }) {
  const Mark = brand ? BRAND_MARKS[brand] : null;
  const ResolvedIcon = Icon || null;
  const tone = BRAND_TONES[brand] || 'from-brand-cyan/25 to-brand-purple/20 text-brand-cyan border-brand-cyan/40';

  const SIZES = {
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  return (
    <div
      className={cn(
        'glass-glow shrink-0 flex items-center justify-center border bg-gradient-to-br backdrop-blur-md',
        SIZES[size],
        tone,
        className
      )}
      aria-hidden="true"
    >
      {Mark ? (
        <Mark className={size === 'md' ? 'w-5 h-5' : 'w-7 h-7'} />
      ) : ResolvedIcon ? (
        <ResolvedIcon className={size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />
      ) : (
        <Sparkles className={size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />
      )}
    </div>
  );
}
