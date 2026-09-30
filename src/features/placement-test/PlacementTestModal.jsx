import React, { useState } from 'react';
import {
  X,
  Compass,
  ArrowRight,
  CheckCircle2,
  Mail,
  User,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { QUESTIONS } from './questions';
import { scoreTest } from './engine';
import { saveLead } from './leads';

const STEPS = ['intro', 'q0', 'q1', 'q2', 'capture', 'result'];

function ProgressSegments({ current }) {
  const answeredCount = STEPS.indexOf(current) - 1; // steps after 'intro', before 'capture'
  return (
    <div className="flex items-center gap-1.5 w-full mb-5">
      {QUESTIONS.map((q, idx) => {
        const isDone = answeredCount > idx;
        const isActive = answeredCount === idx;
        return (
          <div
            key={q.id}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              isDone
                ? 'bg-brand-cyan'
                : isActive
                ? 'bg-white/30'
                : 'bg-white/10'
            }`}
          />
        );
      })}
    </div>
  );
}

export default function PlacementTestModal({
  isOpen,
  onClose,
  onOpenAuth,
  onOpenCalendly,
}) {
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [leadForm, setLeadForm] = useState({ name: '', email: '', whatsapp: '' });
  const [result, setResult] = useState(null);
  const [capturedLead, setCapturedLead] = useState(null);

  if (!isOpen) return null;

  const reset = () => {
    setStep('intro');
    setAnswers({});
    setLeadForm({ name: '', email: '', whatsapp: '' });
    setResult(null);
    setCapturedLead(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAnswer = (questionId, optionId) => {
    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);

    const idx = QUESTIONS.findIndex((q) => q.id === questionId);
    if (idx < QUESTIONS.length - 1) {
      setStep(`q${idx + 1}`);
    } else {
      // All questions answered: score deterministically and move to lead capture.
      setResult(scoreTest(nextAnswers));
      setStep('capture');
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const lead = saveLead({
      name: leadForm.name.trim(),
      email: leadForm.email.trim(),
      whatsapp: leadForm.whatsapp.trim(),
      testResult: {
        level: result.level,
        score: result.score,
        perSkill: result.perSkill,
      },
      source: 'placement-test',
    });
    setCapturedLead(lead);
    setStep('result');
  };

  const openCampus = () => {
    const email = capturedLead?.email || leadForm.email;
    handleClose();
    onOpenAuth(email);
  };

  const openMentor = () => {
    const email = capturedLead?.email || leadForm.email;
    handleClose();
    onOpenCalendly(email);
  };

  const currentQuestion = step.startsWith('q') ? QUESTIONS[Number(step.slice(1))] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="liquid-glass glass-grain rounded-3xl w-full max-w-xl border-white/20 specular-border shadow-2xl p-6 sm:p-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          aria-label="Cerrar test"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.15] flex items-center justify-center text-slate-300 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* INTRO: time expectation before the first question */}
        {step === 'intro' && (
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center mx-auto mb-4 shadow-glow-cyan">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Test de Ubicación Rápido CEFR
            </h3>
            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              2 minutos · 3 preguntas · sin registro · resultado inmediato.
            </p>
            <div className="space-y-2.5 text-left mb-6">
              {QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs"
                >
                  <span className="w-6 h-6 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300">{q.skillLabel}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep('q0')}
              className="btn-liquid-primary w-full !py-3 text-sm"
            >
              <span>Comenzar Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* QUESTIONS: one per screen, no feedback until the end */}
        {currentQuestion && (
          <div>
            <ProgressSegments current={step} />
            <div className="text-xs font-mono text-brand-cyan mb-2">
              Pregunta {Number(step.slice(1)) + 1} de {QUESTIONS.length} ·{' '}
              {currentQuestion.skillLabel}
            </div>
            <h4 className="text-base font-semibold text-white mb-4">
              {currentQuestion.prompt}
            </h4>
            <div className="space-y-2.5">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQuestion.id, option.id)}
                  className="w-full text-left p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-cyan/50 hover:bg-white/[0.08] text-xs font-medium text-slate-200 transition-all"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CAPTURE: partial report unlocked, full report behind the form */}
        {step === 'capture' && result && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Tu resultado está listo</h3>
                <p className="text-xs text-slate-300">Diagnóstico CEFR algorítmico</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-brand-cyan/30 mb-4 space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-xs text-slate-300">Nivel estimado:</span>
                <span className="text-sm font-bold text-brand-cyan">{result.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">Puntaje global:</span>
                <span className="text-sm font-bold text-emerald-400">{result.score}%</span>
              </div>
              <div className="text-xs text-slate-300 pt-1">
                <strong className="text-white">Fortaleza:</strong>{' '}
                {result.strengths[0]?.reason}
              </div>
              <div className="text-xs text-slate-300">
                <strong className="text-white">Brecha prioritaria:</strong>{' '}
                {result.gaps[0]?.reason}
              </div>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <p className="text-xs text-slate-300">
                <Lock className="w-3 h-3 inline-block mr-1 -mt-0.5 text-brand-cyan" />
                Dejanos tu email y te enviamos el <strong className="text-white">plan completo
                de estudio</strong> con tu ruta CEFR detallada.
              </p>

              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full liquid-glass-input text-xs pl-10"
                />
              </div>

              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full liquid-glass-input text-xs pl-10"
                />
              </div>

              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="tel"
                  placeholder="WhatsApp (opcional)"
                  value={leadForm.whatsapp}
                  onChange={(e) => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
                  className="w-full liquid-glass-input text-xs pl-10"
                />
              </div>

              <button type="submit" className="btn-liquid-primary w-full !py-3 text-sm">
                <span>Ver Mi Plan Completo de Estudio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* RESULT: full report + campus / mentor CTAs */}
        {step === 'result' && result && (
          <div className="text-center py-4 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-glow-cyan">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-1">
              ¡Diagnóstico Completado!
            </h4>
            <p className="text-xs text-slate-300 mb-5">
              Tu plan completo fue enviado a{' '}
              <span className="text-brand-cyan font-semibold">
                {capturedLead?.email || leadForm.email}
              </span>
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-brand-cyan/30 text-left mb-5 space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-xs text-slate-300">Nivel recomendado:</span>
                <span className="text-sm font-bold text-brand-cyan">{result.level}</span>
              </div>
              <div className="space-y-2">
                {result.perSkill.map((s) => (
                  <div key={s.key}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">{s.label}</span>
                      <span
                        className={`font-mono font-semibold ${
                          s.ratio >= 0.67
                            ? 'text-emerald-400'
                            : s.ratio >= 0.34
                            ? 'text-brand-cyan'
                            : 'text-amber-400'
                        }`}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          s.ratio >= 0.67
                            ? 'bg-emerald-400'
                            : s.ratio >= 0.34
                            ? 'bg-brand-cyan'
                            : 'bg-amber-400'
                        }`}
                        style={{ width: `${Math.round(s.ratio * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-300 pt-1 border-t border-white/10">
                <strong className="text-white">A trabajar:</strong> {result.gaps[0]?.reason}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={openCampus} className="btn-liquid-primary !py-3 !px-6 text-xs flex-1">
                <span>Ver Mi Ruta de Lecciones en el Campus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={openMentor} className="btn-liquid-secondary !py-3 !px-6 text-xs">
                Validar con Mentor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
