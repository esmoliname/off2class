import React from 'react';
import { Layers, SearchX } from 'lucide-react';
import CourseCard from './CourseCard';
import { CATALOG_COURSES } from '../../utils/catalog';
import { useCourse } from '../../hooks/useCourse';

/**
 * Responsive course grid.
 * - `variant="landing"` renders the fixed featured programs (no filter).
 * - `variant="catalog"` renders the full filtered catalog from CourseContext.
 */
export default function CourseCatalog({ variant = 'landing', onSelectCourse, className }) {
  const { courses } = useCourse();
  const list = variant === 'catalog' ? courses : CATALOG_COURSES.filter((c) =>
    ['placement-test', 'foundation', 'international-exams', 'hybrid-classes'].includes(c.id)
  );

  if (list.length === 0) {
    return (
      <div className="liquid-glass rounded-3xl p-12 text-center border-white/10">
        <SearchX className="w-8 h-8 text-slate-500 mx-auto mb-3" />
        <p className="text-sm text-slate-300">No hay programas en esta categoría todavía.</p>
      </div>
    );
  }

  return (
    <div
      className={
        className ||
        'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'
      }
    >
      {list.map((course) => (
        <CourseCard key={course.id} course={course} onSelect={onSelectCourse} />
      ))}
    </div>
  );
}

export function CatalogSectionHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
        <Layers className="w-3.5 h-3.5" />
        <span>Programas Académicos</span>
      </div>
      <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
        Currículum Diseñado para Resultados Tangibles
      </h2>
      <p className="text-slate-400 text-base sm:text-lg">
        Planes adaptados a tus objetivos: desde fundaciones básicas hasta certificación
        internacional y fluidez laboral.
      </p>
    </div>
  );
}
