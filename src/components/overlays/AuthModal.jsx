import React, { useEffect, useState } from 'react';
import { Lock, Mail, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Modal, Button, Input } from '../ui';
import { MOCK_STUDENT } from '../../utils/mocks';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, prefillEmail }) {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: 'Sofía Valenzuela',
    email: prefillEmail || 'sofia.valenzuela@alumnos.edu',
    password: 'password123',
    levelGoal: 'B2',
  });

  // Carry the lead email captured by the exam portal into the form
  useEffect(() => {
    if (isOpen && prefillEmail) {
      setMode('register');
      setFormData((prev) => ({ ...prev, email: prefillEmail }));
    }
  }, [isOpen, prefillEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      ...MOCK_STUDENT,
      name: formData.name || MOCK_STUDENT.name,
      email: formData.email || MOCK_STUDENT.email,
    });
    onClose();
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess(MOCK_STUDENT);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Acceso de estudiantes">
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border border-white/10 flex items-center justify-center mx-auto mb-3 text-brand-cyan shadow-glow-cyan">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          {mode === 'login' ? 'Portal del Estudiante' : 'Crear Cuenta de Alumno'}
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          {mode === 'login'
            ? 'Accedé a tus métricas de progreso, IA y aula Off2Class'
            : 'Registrate para iniciar tu prueba diagnóstica'}
        </p>
      </div>

      <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
        {['login', 'register'].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === m ? 'bg-white/15 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            {m === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        ))}
      </div>

      <div className="mb-5">
        <Button
          variant="glass"
          size="sm"
          fullWidth
          onClick={handleQuickDemoLogin}
          className="!rounded-xl justify-between border-brand-cyan/40 hover:border-brand-cyan/70"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            Acceso Rápido Demo (Sofía - B2)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-brand-cyan" />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <div className="h-[1px] flex-1 bg-white/10" />
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
          O con tus credenciales
        </span>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <Input
            label="Nombre y Apellido"
            type="text"
            required
            icon={User}
            placeholder="Tu nombre completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}

        <Input
          label="Correo Institucional o Personal"
          type="email"
          required
          icon={Mail}
          placeholder="alumno@ejemplo.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-300">Contraseña</label>
            {mode === 'login' && (
              <span className="text-[11px] text-slate-300 hover:text-brand-cyan cursor-pointer">
                ¿Olvidaste tu contraseña?
              </span>
            )}
          </div>
          <Input
            type="password"
            required
            icon={Lock}
            placeholder="••••••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <Button type="submit" variant="primary" size="md" fullWidth className="!rounded-full font-bold">
          {mode === 'login' ? 'Entrar a mi Campus Virtual' : 'Crear Cuenta y Comenzar'}
        </Button>
      </form>

      <div className="mt-5 text-center text-xs text-slate-300 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Acceso seguro protegido por Off2Class SSO</span>
      </div>
    </Modal>
  );
}
