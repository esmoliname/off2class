import React from 'react';
import { Check, Circle, Lock } from 'lucide-react';
import { Card, ProgressBar } from '../ui';
import { EXAM_SKILLS } from '../../utils/examQuestions';
import { cn } from '../../utils/cn';

const STATUS_META = {
  completed: { label: 'Completada', icon: Check, tone: 'text-emerald-400' },
  active: { label: 'Activa', icon: Circle, tone: 'text-brand-cyan' },
  pending: { label: 'Pendiente', icon: Lock, tone: 'text-slate-500' },
};

/**
 * Right-hand navigation of sections with Active / Completed states,
 * exam progress and skill badges.
 */
export default function SectionSidebar({ sections, progress, answeredCount, total, onJump, stage }) {
  return (
    <Card variant="panel" rounded="xl" className="p-5 lg:sticky lg:top-28">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Secciones del Examen</h3>
        <span className="text-[11px] font-mono text-slate-400">
          {answeredCount}/{total}
        </span>
      </div>

      <ExamProgressValue progress={progress} />

      <div className="mt-5 mb-3 flex items-center gap-3 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          Active
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Completed
        </span>
      </div>

      <nav className="space-y-2">
        {sections.map((section) => {
          const meta = STATUS_META[section.state];
          const StatusIcon = meta.icon;
          const interactive = section.state !== 'pending' && stage === 'questions';

          return (
            <button
              key={section.id}
              onClick={() => interactive && onJump?.(section.index)}
              disabled={!interactive}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-xl border text-left transition-all duration-200',
                section.state === 'active' &&
                  'bg-brand-cyan/10 border-brand-cyan/45 shadow-glow-cyan',
                section.state === 'completed' &&
                  'bg-emerald-500/[0.06] border-emerald-500/25 hover:border-emerald-400/50',
                section.state === 'pending' && 'bg-white/[0.02] border-white/[0.06] opacity-60',
                interactive && 'cursor-pointer',
                !interactive && 'cursor-default'
              )}
            >
              <span
                className={cn(
                  'w-7 h-7 rounded-lg border flex items-center justify-center text-[11px] font-bold shrink-0',
                  section.state === 'active'
                    ? 'bg-brand-cyan text-slate-950 border-brand-cyan'
                    : section.state === 'completed'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                    : 'bg-white/[0.04] text-slate-500 border-white/10'
                )}
              >
                {section.state === 'completed' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  section.index + 1
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-white truncate">
                  {section.skillLabel}
                </span>
                <span className={cn('block text-[10px] font-medium', meta.tone)}>
                  {meta.label}
                </span>
              </span>

              <StatusIcon className={cn('w-3.5 h-3.5 shrink-0', meta.tone)} />
            </button>
          );
        })}
      </nav>

      <div className="mt-6 pt-5 border-t border-white/[0.07]">
        <h4 className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-3">
          Habilidades evaluadas
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {EXAM_SKILLS.map((skill) => (
            <span
              key={skill.key}
              className={cn(
                'text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md border',
                skill.tone === 'cyan' && 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30',
                skill.tone === 'purple' && 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                skill.tone === 'blue' && 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                skill.tone === 'emerald' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                skill.tone === 'amber' && 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              )}
            >
              {skill.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ExamProgressValue({ progress }) {
  return <ProgressBar value={progress} tone="cyan" size="sm" />;
}
