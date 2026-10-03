import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import AmbientGlow from '../components/layout/AmbientGlow';
import { Badge, Button, Card } from '../components/ui';
import ExamProgressBar from '../components/exam/ExamProgressBar';
import SectionSidebar from '../components/exam/SectionSidebar';
import QuestionCard from '../components/exam/QuestionCard';
import LeadCaptureForm from '../components/exam/LeadCaptureForm';
import ExamResult from '../components/exam/ExamResult';
import { useExam } from '../hooks/useExam';
import { EXAM_SKILLS } from '../utils/examQuestions';
import { VIEWS } from '../utils/constants';

/**
 * Vista 2 — Portal de Placement Test.
 * Two-column grid: question area + section navigation (Active / Completed).
 */
export default function ExamPortal({ onNavigate, onOpenAuth, onOpenCalendly }) {
  const exam = useExam();
  const {
    stage,
    sections,
    currentQuestion,
    questions,
    answers,
    answeredCount,
    progress,
    activeIndex,
    result,
    leadForm,
    capturedLead,
    start,
    reset,
    selectOption,
    goToSection,
    next,
    back,
    setLeadField,
    submitLead,
  } = exam;

  const isLastQuestion = activeIndex === questions.length - 1;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  const openCampus = () => onOpenAuth(capturedLead?.email || leadForm.email);
  const openMentor = () => onOpenCalendly(capturedLead?.email || leadForm.email);

  return (
    <main className="min-h-screen pt-32 pb-28 relative">
      <AmbientGlow tone="cyan" className="top-10 -left-32" />
      <AmbientGlow tone="blue" className="bottom-0 right-0" />

      <PageContainer className="relative z-10">
        {/* Header */}
        <div className="mb-7">
          <button
            onClick={() => onNavigate(VIEWS.CATALOG)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-cyan transition-colors mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al catálogo</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <Badge tone="cyan" size="md" icon={Sparkles}>
                  Placement Test · CEFR
                </Badge>
                <Badge tone="slate" size="sm" icon={Clock}>
                  2 minutos · 3 preguntas
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Portal de Evaluación de Nivel
              </h1>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Gramática, vocabulario, lectura, escucha y expresión oral en un único diagnóstico
                algorítmico con resultado inmediato.
              </p>
            </div>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {EXAM_SKILLS.map((skill) => (
                <span
                  key={skill.key}
                  className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-lg border ${
                    skill.tone === 'cyan'
                      ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30'
                      : skill.tone === 'purple'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      : skill.tone === 'blue'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : skill.tone === 'emerald'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-7">
          <ExamProgressBar
            value={progress}
            answered={stage === 'intro' ? 0 : answeredCount}
            total={questions.length}
          />
        </div>

        {/* Grid: question area + section sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
          <div className="min-w-0">
            {/* INTRO */}
            {stage === 'intro' && (
              <Card variant="panel" rounded="xl" className="p-7 sm:p-9 relative overflow-hidden">
                <div className="absolute -top-14 -right-14 w-56 h-56 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center mb-5 shadow-glow-cyan">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Test de Ubicación Rápido CEFR
                  </h2>
                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    2 minutos · 3 preguntas · sin registro · resultado inmediato. Cada pregunta
                    evalúa una habilidad distinta.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
                    {questions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10"
                      >
                        <span className="w-7 h-7 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-slate-300">{q.skillLabel}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="primary" size="lg" onClick={start} className="w-full sm:w-auto">
                    <span>Comenzar Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* QUESTIONS */}
            {stage === 'questions' && currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                index={activeIndex}
                total={questions.length}
                selectedId={currentAnswer}
                onSelect={(optionId) => selectOption(currentQuestion.id, optionId)}
                footer={
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={back}
                      disabled={activeIndex === 0}
                      className={activeIndex === 0 ? 'opacity-40 pointer-events-none' : ''}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </Button>

                    <div className="flex items-center gap-3">
                      {!currentAnswer && (
                        <span className="text-[11px] text-slate-500 hidden sm:block">
                          Seleccioná una opción para continuar
                        </span>
                      )}
                      <Button
                        variant={isLastQuestion ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={next}
                        disabled={!currentAnswer}
                        className={!currentAnswer ? 'opacity-40 pointer-events-none' : ''}
                      >
                        <span>{isLastQuestion ? 'Ver mi resultado' : 'Siguiente'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                }
              />
            )}

            {/* LEAD CAPTURE */}
            {stage === 'capture' && result && (
              <Card variant="panel" rounded="xl" className="p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
                    <Badge tone="emerald" size="md" icon={CheckCircle2}>
                      Resultado parcial listo
                    </Badge>
                    <Button variant="ghost" size="xs" onClick={reset}>
                      Reiniciar test
                    </Button>
                  </div>

                  <ExamResult result={result} />
                  <LeadCaptureForm
                    result={result}
                    form={leadForm}
                    onFieldChange={setLeadField}
                    onSubmit={submitLead}
                  />
                </div>
              </Card>
            )}

            {/* RESULT */}
            {stage === 'result' && result && (
              <Card variant="feature" rounded="xl" className="p-6 sm:p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <ExamResult result={result} email={capturedLead?.email || leadForm.email} />

                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-white/10">
                    <Button variant="primary" size="md" onClick={openCampus} className="flex-1">
                      <span>Ver Mi Ruta en el Campus</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="md" onClick={openMentor}>
                      <Calendar className="w-4 h-4 text-brand-cyan" />
                      <span>Validar con Mentor</span>
                    </Button>
                    <Button variant="ghost" size="md" onClick={reset}>
                      Repetir test
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <SectionSidebar
            sections={sections}
            progress={progress}
            answeredCount={stage === 'intro' ? 0 : answeredCount}
            total={questions.length}
            onJump={goToSection}
            stage={stage}
          />
        </div>
      </PageContainer>
    </main>
  );
}
