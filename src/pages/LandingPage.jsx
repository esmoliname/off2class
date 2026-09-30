import React from 'react';
import Hero from '../components/Hero';
import CourseCatalog from '../components/CourseCatalog';
import { ArrowRight, Calendar, Sparkles, CheckCircle, ShieldCheck, Cpu, Globe2, MessageSquare, ExternalLink } from 'lucide-react';
import { OFF2CLASS_WHITELABEL_URL } from '../utils/constants';

export default function LandingPage({
  onOpenCalendly,
  onOpenAuth,
  onStartPlacementTest,
  onSelectCourse
}) {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero
        onOpenCalendly={onOpenCalendly}
        onStartPlacementTest={onStartPlacementTest}
        onNavigateToCourses={() => {
          document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Course Catalog */}
      <CourseCatalog
        onSelectCourse={onSelectCourse}
        onOpenCalendly={onOpenCalendly}
        onStartPlacementTest={onStartPlacementTest}
      />

      {/* 3. Methodology & Innovation Section */}
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
                  El poder de <span className="gradient-text-cyan">Off2Class</span> potenciado con Inteligencia Artificial
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Combinamos la biblioteca didáctica más respetada a nivel universitario con un motor de diagnóstico adaptativo. Detectamos las debilidades exactas de cada alumno para que cada hora de estudio cuente el doble.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center shrink-0 mt-0.5 text-brand-cyan font-bold text-xs">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Aula Virtual Whitelabel sin intermediarios</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Acceso con Single Sign-On directo a las lecciones interactivas, tareas y material oficial de Off2Class.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5 text-purple-400 font-bold text-xs">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Recomendador Inteligente de Lecciones</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Algoritmos que analizan tu desempeño en tiempo real y sugieren los ejercicios específicos para desbloquear tu siguiente nivel CEFR.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 font-bold text-xs">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Comunidad Activa Verneval</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Canales colaborativos de speaking, debate académico y resolución de dudas con profesores en vivo.
                      </p>
                    </div>
                  </div>
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
                  <span className="text-[11px] font-mono text-slate-300">campus.off2class.whitelabel/bridge</span>
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
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="text-slate-300">Speaking & Connected Speech</span>
                    <span className="text-emerald-400 font-medium">B2 Avanzado</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="text-slate-300">Listening Comprehension</span>
                    <span className="text-brand-cyan font-medium">B2 Sólido</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="text-slate-300">Past & Mixed Conditionals</span>
                    <span className="text-amber-400 font-medium">En Refuerzo IA</span>
                  </div>
                </div>

                <a
                  href={OFF2CLASS_WHITELABEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid-primary !w-full !py-2.5 text-xs"
                >
                  <span>Probar Conexión Off2Class Whitelabel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA Section */}
      <section className="py-20 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="liquid-glass rounded-3xl p-8 sm:p-14 border-white/15 specular-border">
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              ¿Listo para certificar tu nivel de inglés?
            </h3>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Tomá la prueba diagnóstica gratuita o agendá una llamada con nuestro equipo pedagógico para diseñar tu ruta académica.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartPlacementTest}
                className="btn-liquid-primary !py-3.5 !px-8 text-sm w-full sm:w-auto"
              >
                <span>Hacer Test Diagnóstico Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenCalendly}
                className="btn-liquid-secondary !py-3.5 !px-8 text-sm w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 text-brand-cyan" />
                <span>Agendar Asesoría (Calendly)</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
