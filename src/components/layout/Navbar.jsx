import React from 'react';
import { Sparkles, Calendar, User, LogOut, Radio } from 'lucide-react';
import BridgeCTA from '../shared/BridgeCTA';
import { VIEWS } from '../../utils/constants';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { id: VIEWS.LANDING, label: 'Inicio' },
  { id: VIEWS.CATALOG, label: 'Catálogo' },
  { id: VIEWS.CLASSROOM, label: 'Aula en Vivo' },
];

export default function Navbar({
  currentView,
  onNavigate,
  isAuthenticated,
  user,
  onOpenAuth,
  onOpenCalendly,
  onLogout,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300">
      <nav className="max-w-7xl mx-auto liquid-glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between specular-border">
        {/* Brand */}
        <button
          onClick={() => onNavigate(VIEWS.LANDING)}
          className="flex items-center gap-3 cursor-pointer group text-left"
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
            <p className="text-[11px] text-slate-300 font-medium tracking-wide">
              University English Suite
            </p>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5',
                currentView === link.id
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
              )}
            >
              {link.id === VIEWS.CLASSROOM && (
                <Radio className={cn('w-3.5 h-3.5', currentView === link.id ? 'text-brand-cyan' : 'text-emerald-400')} />
              )}
              {link.label}
            </button>
          ))}

          <button
            onClick={onOpenCalendly}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-1.5 border border-transparent"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
            Agendar Asesoría
          </button>

          {isAuthenticated && (
            <button
              onClick={() => onNavigate(VIEWS.DASHBOARD)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                currentView === VIEWS.DASHBOARD
                  ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40 shadow-glow-cyan'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border-transparent'
              )}
            >
              Mi Campus IA
            </button>
          )}
        </div>

        {/* Actions / session */}
        <div className="flex items-center gap-2.5">
          <BridgeCTA variant="nav" source="navbar" />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onNavigate(currentView === VIEWS.DASHBOARD ? VIEWS.LANDING : VIEWS.DASHBOARD)
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all text-xs text-white"
              >
                <img
                  src={user?.avatarUrl}
                  alt={user?.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-brand-cyan/50"
                />
                <span className="hidden sm:inline font-medium text-slate-200">
                  {user?.name?.split(' ')[0]}
                </span>
                <span className="hidden sm:inline text-[10px] text-brand-cyan bg-brand-cyan/10 px-1.5 py-0.5 rounded border border-brand-cyan/30 font-mono">
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
