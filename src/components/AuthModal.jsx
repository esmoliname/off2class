import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { MOCK_STUDENT } from '../utils/constants';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: 'Sofía Valenzuela',
    email: 'sofia.valenzuela@alumnos.edu',
    password: 'password123',
    levelGoal: 'B2'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userPayload = {
      ...MOCK_STUDENT,
      name: formData.name || MOCK_STUDENT.name,
      email: formData.email || MOCK_STUDENT.email,
    };
    onLoginSuccess(userPayload);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess(MOCK_STUDENT);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
      <div className="liquid-glass rounded-3xl w-full max-w-md border-white/20 specular-border shadow-2xl p-6 sm:p-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow backdrop */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.15] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border border-white/10 flex items-center justify-center mx-auto mb-3 text-brand-cyan shadow-glow-cyan">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Portal del Estudiante' : 'Crear Cuenta de Alumno'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Accedé a tus métricas de progreso, IA y aula Off2Class'
              : 'Registrate para iniciar tu prueba diagnóstica'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'login'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'register'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Demo Fast Login Button */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-cyan/15 to-purple-500/15 border border-brand-cyan/40 hover:border-brand-cyan/70 text-slate-200 text-xs font-semibold flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span>Acceso Rápido Demo (Sofía - B2)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-brand-cyan group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex items-center gap-3 my-4">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">O con tus credenciales</span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre y Apellido</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full liquid-glass-input text-xs pl-10"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Correo Institucional o Personal</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                placeholder="alumno@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full liquid-glass-input text-xs pl-10"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-300">Contraseña</label>
              {mode === 'login' && (
                <span className="text-[11px] text-slate-400 hover:text-brand-cyan cursor-pointer">
                  ¿Olvidaste tu contraseña?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full liquid-glass-input text-xs pl-10"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-liquid-primary !py-3 text-xs font-bold mt-2"
          >
            {mode === 'login' ? 'Entrar a mi Campus Virtual' : 'Crear Cuenta y Comenzar'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Acceso seguro protegido por Off2Class SSO</span>
        </div>
      </div>
    </div>
  );
}
