import React from 'react';
import { Compass, Sparkles, Award, Users, Check, ArrowRight, Clock, Layers } from 'lucide-react';
import { COURSES_CATALOG } from '../utils/constants';

const iconMap = {
  Compass: Compass,
  Sparkles: Sparkles,
  Award: Award,
  Users: Users,
};

export default function CourseCatalog({ onSelectCourse, onOpenCalendly, onStartPlacementTest }) {
  return (
    <section id="cursos" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Programas Académicos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Currículum Diseñado para Resultados Tangibles
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Planes adaptados a tus objetivos: desde fundaciones básicas hasta certificación internacional y fluidez laboral.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {COURSES_CATALOG.map((course) => {
            const IconComponent = iconMap[course.iconName] || Sparkles;
            const isFeatured = course.featured;

            return (
              <div
                key={course.id}
                className={`liquid-glass-card rounded-3xl p-7 flex flex-col justify-between specular-border relative overflow-hidden group ${
                  isFeatured ? 'border-brand-cyan/40 bg-[#0d1424]/80 shadow-[0_0_30px_rgba(0,240,255,0.1)]' : ''
                }`}
              >
                {/* Glow accent */}
                {isFeatured && (
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-cyan/20 rounded-full blur-2xl pointer-events-none" />
                )}

                <div>
                  {/* Top Badges & Meta */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span
                      className={`text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full border ${
                        course.badgeColor === 'cyan'
                          ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30'
                          : course.badgeColor === 'emerald'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : course.badgeColor === 'purple'
                          ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                          : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                      }`}
                    >
                      {course.badge}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Header & Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-white/20 transition-transform">
                      <IconComponent className="w-6 h-6 text-brand-cyan" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">{course.level}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2.5 mb-8 border-t border-white/[0.06] pt-5">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-brand-cyan" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (course.id === 'placement-test') {
                        onStartPlacementTest();
                      } else if (course.id === 'hybrid-classes') {
                        onOpenCalendly();
                      } else {
                        onSelectCourse(course);
                      }
                    }}
                    className={`w-full py-3 px-5 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'btn-liquid-primary !w-full'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white hover:border-white/25'
                    }`}
                  >
                    <span>{course.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
