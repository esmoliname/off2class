import React from 'react';
import { Sparkles, Calendar, User, LogOut, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { OFF2CLASS_WHITELABEL_URL } from '../utils/constants';

export default function Navbar({
  currentView,
  setCurrentView,
  isAuthenticated,
  user,
  onOpenAuth,
  onOpenCalendly,
  onLogout
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300">
      <nav className="max-w-7xl mx-auto liquid-glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between specular-border">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan via-blue-600 to-brand-purple p-0.5 flex items-center justify-center shadow-glow-cyan transition-transform group-hover:scale-105 duration-200">
            <div className="w-full h-full bg-[#0a0e17] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-cyan group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-lg">Off2Class</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium tracking-wide">University English Suite</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              currentView === 'landing'
                ? 'bg-white/10 text-white shadow-sm border border-white/15'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Inicio
          </button>
          <a
            href="#cursos"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                setCurrentView('landing');
                setTimeout(() => {
                  document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            Catálogo de Cursos
          </a>
          <button
            onClick={onOpenCalendly}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
            Agendar Asesoría
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                currentView === 'dashboard'
                  ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-glow-cyan'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              Mi Campus IA
            </button>
          )}
        </div>

        {/* Actions / Session */}
        <div className="flex items-center gap-2.5">
          {/* Quick Bridge button to Off2Class whitelabel */}
          <a
            href={OFF2CLASS_WHITELABEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Ir directo al portal Off2Class Whitelabel"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.1] hover:border-brand-cyan/50 hover:text-brand-cyan transition-all"
          >
            <span>Aula Virtual</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView(currentView === 'dashboard' ? 'landing' : 'dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all text-xs text-white"
              >
                <img
                  src={user?.avatarUrl}
                  alt={user?.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-brand-cyan/50"
                />
                <span className="hidden sm:inline font-medium text-slate-200">{user?.name?.split(' ')[0]}</span>
                <span className="text-[10px] text-brand-cyan bg-brand-cyan/10 px-1.5 py-0.5 rounded border border-brand-cyan/30 font-mono">
                  {user?.currentLevel?.split(' ')[0]}
                </span>
              </button>

              <button
                onClick={onLogout}
                title="Cerrar sesión"
                className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-red-500/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-liquid-primary !py-2 !px-4 text-xs font-semibold"
            >
              <User className="w-3.5 h-3.5" />
              <span>Acceso Alumnos</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
