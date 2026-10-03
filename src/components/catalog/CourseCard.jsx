import React from 'react';
import { Clock, Check, ArrowRight, Target, Compass, Sparkles, Award, Users, Zap, Cpu } from 'lucide-react';
import { Card, Badge, Button } from '../ui';
import ExamBadge from './ExamBadge';
import { cn } from '../../utils/cn';

/** iconName (data) -> lucide component */
const ICON_MAP = {
  Compass,
  Sparkles,
  Award,
  Users,
  Zap,
  Cpu,
};

/**
 * Floating glass panel for a course/track.
 * Hover: lift + specular edge + icon glow; CTA arrow micro-interaction.
 */
export default function CourseCard({ course, onSelect, className }) {
  const isFeatured = Boolean(course.featured);

  return (
    <Card
      variant={isFeatured ? 'feature' : 'card'}
      rounded="xl"
      hover
      className={cn('group p-7 flex flex-col justify-between h-full', className)}
    >
      {isFeatured && (
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-cyan/20 rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Top meta */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <Badge tone={course.badgeColor || 'cyan'} size="sm" uppercase>
            {course.badge}
          </Badge>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06] shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Brand / icon + title */}
        <div className="flex items-start gap-4 mb-4">
          <ExamBadge brand={course.brand} Icon={course.Icon || ICON_MAP[course.iconName]} />
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-cyan transition-colors leading-snug">
              {course.title}
            </h3>
            <p className="text-xs text-slate-300 font-medium mt-1">{course.level}</p>
          </div>
        </div>

        {/* Objective metric (exam tracks) */}
        {course.objective && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07] text-xs">
            <Target className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
            <span className="text-slate-400">Puntaje objetivo</span>
            <span className="ml-auto font-mono font-bold text-brand-cyan">
              {course.objective}
            </span>
          </div>
        )}

        <p className="text-slate-300 text-sm leading-relaxed mb-5">{course.description}</p>

        {/* Features */}
        <ul className="space-y-2.5 border-t border-white/[0.06] pt-5">
          {course.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <span className="w-4 h-4 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-brand-cyan" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="pt-6 relative z-10">
        <Button
          variant={isFeatured ? 'primary' : 'glass'}
          size="md"
          fullWidth
          onClick={() => onSelect?.(course)}
          className="group/cta"
        >
          <span>{course.ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}
