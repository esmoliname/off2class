import React from 'react';
import { ArrowRight, Calendar, Sparkles, CheckCircle2, ShieldCheck, Zap, Laptop, BookOpen } from 'lucide-react';
import { OFF2CLASS_WHITELABEL_URL } from '../utils/constants';

export default function Hero({ onOpenCalendly, onStartPlacementTest, onNavigateToCourses }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Dynamic Ambient Glows */}
      <div className="ambient-glow-cyan top-10 -left-20" />
      <div className="ambient-glow-purple top-32 right-0" />
      <div className="ambient-glow-blue bottom-10 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border-white/15 text-xs text-slate-300 mb-8 animate-float-slow specular-border">
            <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
            <span className="font-semibold text-brand-cyan">Off2Class Powered</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Plataforma Universitaria & Whitelabel</span>
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan ml-0.5" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 gradient-text-apple">
            Dominá el Inglés Universitario con <span className="gradient-text-cyan">Precisión Algorítmica</span> y Clases en Vivo
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Alineado al estándar internacional CEFR. Diagnóstico con IA, lecciones guiadas por profesores certificados y acceso directo a tu aula virtual <span className="text-white font-semibold">Off2Class</span> de marca blanca.
          </p>

          {/* High-Impact CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-14">
            <button
              onClick={onStartPlacementTest}
              className="btn-liquid-primary w-full sm:w-auto text-base !py-3.5 !px-8 group"
            >
              <span>Test de Ubicación Gratis</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenCalendly}
              className="btn-liquid-secondary w-full sm:w-auto text-base !py-3.5 !px-8 group"
            >
              <Calendar className="w-4 h-4 text-brand-cyan group-hover:scale-110 transition-transform" />
              <span>Agendar Asesoría (Calendly)</span>
            </button>
          </div>

          {/* Key Value Prop Pills / Micro-Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl pt-4">
            <div className="liquid-glass-card rounded-2xl p-4 text-left border-white/10 specular-border">
              <div className="flex items-center gap-2 mb-1.5 text-brand-cyan">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Algoritmo</span>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">25 Min</div>
              <div className="text-xs text-slate-400">Diagnóstico CEFR en tiempo real</div>
            </div>

            <div className="liquid-glass-card rounded-2xl p-4 text-left border-white/10 specular-border">
              <div className="flex items-center gap-2 mb-1.5 text-purple-400">
                <Laptop className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Whitelabel</span>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">Off2Class</div>
              <div className="text-xs text-slate-400">Aula virtual integrada sin fricción</div>
            </div>

            <div className="liquid-glass-card rounded-2xl p-4 text-left border-white/10 specular-border">
              <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Efectividad</span>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">98.4%</div>
              <div className="text-xs text-slate-400">Aprobación en IELTS y TOEFL</div>
            </div>

            <div className="liquid-glass-card rounded-2xl p-4 text-left border-white/10 specular-border">
              <div className="flex items-center gap-2 mb-1.5 text-blue-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Contenido</span>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">+450</div>
              <div className="text-xs text-slate-400">Lecciones interactivas modulares</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
