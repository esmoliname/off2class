import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useCourse } from '../../hooks/useCourse';
import { cn } from '../../utils/cn';

/** Pill-based category filter driven by CourseContext. */
export default function CategoryFilter() {
  const { filters, activeFilter, setActiveFilter, courses } = useCourse();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400 font-semibold mr-1">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Filtrar
      </span>

      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        const count =
          filter.id === 'all'
            ? courses.length
            : courses.filter((c) => c.category === filter.id).length;

        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            aria-pressed={isActive}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 active:scale-95 flex items-center gap-2',
              isActive
                ? 'bg-brand-cyan/15 border-brand-cyan/50 text-brand-cyan shadow-glow-cyan'
                : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-white/25 hover:bg-white/[0.07]'
            )}
          >
            <span>{filter.label}</span>
            <span
              className={cn(
                'text-[10px] font-mono px-1.5 py-0.5 rounded-full',
                isActive ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-white/[0.06] text-slate-400'
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
