import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, Compass, GraduationCap, Sparkles } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import AmbientGlow from '../components/layout/AmbientGlow';
import { Badge, Button, Card } from '../components/ui';
import CourseCatalog from '../components/catalog/CourseCatalog';
import CategoryFilter from '../components/catalog/CategoryFilter';
import { useCourse } from '../hooks/useCourse';
import { VIEWS } from '../utils/constants';

/**
 * Vista 1 — Catálogo de Preparación.
 * Filterable grid of international exam tracks + academic programs.
 */
export default function CourseCatalogPage({
  onNavigate,
  onSelectCourse,
  onOpenCalendly,
  onStartPlacementTest,
}) {
  const { activeFilter, courses } = useCourse();

  return (
    <main className="min-h-screen pt-32 pb-24 relative">
      <AmbientGlow tone="cyan" className="top-0 -left-24" />
      <AmbientGlow tone="purple" className="top-64 -right-24" />

      <PageContainer className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <button
            onClick={() => onNavigate(VIEWS.LANDING)}
            className="flex w-fit items-center gap-1.5 text-xs text-slate-400 hover:text-brand-cyan transition-colors mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </button>

          <Badge tone="cyan" size="md" icon={GraduationCap} className="mb-4">
            Catálogo de Preparación
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-[1.08]">
            Preparáte para el examen que tu{' '}
            <span className="gradient-text-cyan">carrera exige</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            IELTS, TOEFL, Cambridge y Duolingo English Test con simulacros reales, corrección
            experta y reportes de progreso por sección.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <CategoryFilter />
        </div>

        <div className="flex items-center justify-between mb-5 text-xs text-slate-500">
          <span>
            Mostrando <span className="text-white font-semibold">{courses.length}</span> programas
          </span>
          <span className="font-mono">
            filtro: <span className="text-brand-cyan">{activeFilter}</span>
          </span>
        </div>

        {/* Grid */}
        <CourseCatalog variant="catalog" onSelectCourse={onSelectCourse} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7" />

        {/* Mid-page conversion band */}
        <div className="mt-14">
          <Card variant="feature" rounded="xl" className="p-7 sm:p-9 relative overflow-hidden">
            <div className="absolute -top-16 -left-10 w-64 h-64 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan mb-3">
                  <Compass className="w-3.5 h-3.5" />
                  <span>¿Por dónde empiezo?</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Diagnosticá tu nivel antes de elegir
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  El test de ubicación CEFR tarda 2 minutos y te devuelve el nivel exacto, las
                  brechas por habilidad y la ruta recomendada antes de inscribirte.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button variant="primary" size="lg" onClick={onStartPlacementTest}>
                  <Sparkles className="w-4 h-4" />
                  <span>Hacer Test Diagnóstico</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" onClick={onOpenCalendly}>
                  <Calendar className="w-4 h-4 text-brand-cyan" />
                  <span>Agendar Asesoría</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </PageContainer>
    </main>
  );
}
