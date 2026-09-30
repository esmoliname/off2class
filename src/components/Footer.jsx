import React from 'react';
import { Sparkles, Shield, Heart, Globe } from 'lucide-react';
import BridgeCTA from './shared/BridgeCTA';

export default function Footer({ onOpenCalendly, onStartPlacementTest }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07090e]/90 backdrop-blur-xl pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0a0e17] rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                </div>
              </div>
              <span className="font-bold text-white text-base tracking-tight">Off2Class University</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Entorno pedagógico de alta exigencia para estudiantes universitarios y profesionales. Plataforma oficial de marca blanca Off2Class integrada con IA.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full w-fit border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistemas y Servidores 100% Operativos</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">Programas</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={onStartPlacementTest} className="hover:text-brand-cyan transition-colors">
                  Test de Ubicación CEFR Gratis
                </button>
              </li>
              <li>
                <a href="#cursos" className="hover:text-brand-cyan transition-colors">Clases desde Cero (A1-A2)</a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-brand-cyan transition-colors">Preparación IELTS & TOEFL</a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-brand-cyan transition-colors">Clases 1 a 1 y Grupales</a>
              </li>
            </ul>
          </div>

          {/* Whitelabel & Tech */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">Ecosistema</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <BridgeCTA variant="bare" source="footer" />
              </li>
              <li>
                <button onClick={onOpenCalendly} className="hover:text-brand-cyan transition-colors">
                  Agendar Sesión Pedagógica
                </button>
              </li>
              <li>
                <span className="text-slate-500">Módulo Comunitario Verneval</span>
              </li>
              <li>
                <span className="text-slate-500">Recomendador de Lecciones IA</span>
              </li>
            </ul>
          </div>

          {/* Standards & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">Acreditación</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Currículum alineado con el Common European Framework of Reference for Languages (CEFR).
            </p>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>Garantía de Privacidad y Protección de Datos Académicos</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Off2Class University Suite. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Términos de Servicio</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Política de Privacidad</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Contacto Académico</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
