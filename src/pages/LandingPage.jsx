import React from 'react';
import { ArrowRight, Calendar, Layers, Cpu } from 'lucide-react';
import Hero from '../components/sections/Hero';
import CourseCatalog, { CatalogSectionHeader } from '../components/catalog/CourseCatalog';
import BridgeCTA from '../components/shared/BridgeCTA';
import { Button } from '../components/ui';
import { VIEWS } from '../utils/constants';

export default function LandingPage({
  onOpenCalendly,
  onOpenAuth,
  onStartPlacementTest,
  onSelectCourse,
  onNavigate,
}) {
  return (
    <main className="min-h-screen">
      {/* 1. Hero */}
      <Hero
        onOpenCalendly={onOpenCalendly}
        onStartPlacementTest={onStartPlacementTest}
        onNavigateToCourses={() => onNavigate(VIEWS.CATALOG)}
      />

      {/* 2. Course Catalog */}
      <section id="cursos" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <CatalogSectionHeader />

          <CourseCatalog
            variant="landing"
            onSelectCourse={onSelectCourse}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          />

          <div className="mt-10 text-center">
            <Button variant="glass" size="md" onClick={() => onNavigate(VIEWS.CATALOG)}>
              <Layers className="w-4 h-4 text-brand-cyan" />
              <span>Ver Catálogo Completo de Preparación</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Methodology & Innovation */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="liquid-glass rounded-3xl p-8 sm:p-12 border-white/10 specular-border relative overflow-hidden">
            <div className="ambient-glow-purple -top-20 -left-20" />
            <div className="ambient-glow-cyan -bottom-20 -right-20" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan mb-4">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Arquitectura Pedagógica Dual</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                  El poder de <span className="gradient-text-cyan">Off2Class</span> potenciado con
                  Inteligencia Artificial
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Combinamos la biblioteca didáctica más respetada a nivel universitario con un
                  motor de diagnóstico adaptativo. Detectamos las debilidades exactas de cada
                  alumno para que cada hora de estudio cuente el doble.
                </p>

                <div className="space-y-4">
                  <Step
                    n={1}
                    tone="cyan"
                    title="Aula Virtual Whitelabel sin intermediarios"
                    desc="Acceso con Single Sign-On directo a las lecciones interactivas, tareas y material oficial de Off2Class."
                  />
                  <Step
                    n={2}
                    tone="purple"
                    title="Recomendador Inteligente de Lecciones"
                    desc="Algoritmos que analizan tu desempeño en tiempo real y sugieren los ejercicios específicos para desbloquear tu siguiente nivel CEFR."
                  />
                  <Step
                    n={3}
                    tone="emerald"
                    title="Comunidad Activa Verneval"
                    desc="Canales colaborativos de speaking, debate académico y resolución de dudas con profesores en vivo."
                  />
                </div>
              </div>

              {/* Visual preview card */}
              <div className="liquid-glass-card rounded-2xl p-6 border-white/15 specular-border">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300">
                    campus.off2class.whitelabel/bridge
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Progreso CEFR Estimado</span>
                    <span className="text-xs font-mono text-brand-cyan font-bold">Nivel B2.2 (78%)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-cyan to-blue-500 h-full w-[78%] rounded-full shadow-glow-cyan" />
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <PreviewRow label="Speaking & Connected Speech" value="B2 Avanzado" tone="emerald" />
                  <PreviewRow label="Listening Comprehension" value="B2 Sólido" tone="cyan" />
                  <PreviewRow label="Past & Mixed Conditionals" value="En Refuerzo IA" tone="amber" />
                </div>

                <BridgeCTA variant="inline" source="landing_methodology" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-20 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="liquid-glass rounded-3xl p-8 sm:p-14 border-white/15 specular-border">
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              ¿Listo para certificar tu nivel de inglés?
            </h3>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Tomá la prueba diagnóstica gratuita o agendá una llamada con nuestro equipo
              pedagógico para diseñar tu ruta académica.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={onStartPlacementTest}>
                <span>Hacer Test Diagnóstico Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" onClick={onOpenCalendly}>
                <Calendar className="w-4 h-4 text-brand-cyan" />
                <span>Agendar Asesoría (Calendly)</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Step({ n, tone, title, desc }) {
  const tones = {
    cyan: 'bg-brand-cyan/20 border-brand-cyan/40 text-brand-cyan',
    purple: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
    emerald: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
  };
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${tones[tone]}`}
      >
        {n}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="text-xs text-slate-300 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function PreviewRow({ label, value, tone }) {
  const tones = {
    emerald: 'text-emerald-400',
    cyan: 'text-brand-cyan',
    amber: 'text-amber-400',
  };
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
      <span className="text-slate-300">{label}</span>
      <span className={`font-medium ${tones[tone]}`}>{value}</span>
    </div>
  );
}
