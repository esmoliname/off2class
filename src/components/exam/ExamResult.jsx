import React from 'react';
import { CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge, ProgressBar } from '../ui';

/**
 * Full diagnostic report: level, global score and per-skill breakdown.
 */
export default function ExamResult({ result, email }) {
  if (!result) return null;

  const toneFor = (ratio) =>
    ratio >= 0.67 ? 'emerald' : ratio >= 0.34 ? 'cyan' : 'amber';

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-glow-cyan">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Diagnóstico completado</h3>
          <p className="text-xs text-slate-300">
            {email ? (
              <>
                Plan enviado a <span className="text-brand-cyan font-semibold">{email}</span>
              </>
            ) : (
              'Diagnóstico CEFR algorítmico'
            )}
          </p>
        </div>
        <Badge tone="cyan" size="md" className="ml-auto">
          {result.level}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <div className="text-[11px] text-slate-400 mb-1">Puntaje global</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{result.score}%</div>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <div className="text-[11px] text-slate-400 mb-1">Nivel estimado</div>
          <div className="text-lg font-bold text-brand-cyan">{result.level.split(' ')[0]}</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
        <h4 className="text-xs font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-brand-cyan" />
          Desglose por habilidad
        </h4>
        {result.perSkill.map((skill) => (
          <div key={skill.key}>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-slate-300">{skill.label}</span>
              <span
                className={`font-mono font-semibold ${
                  skill.ratio >= 0.67
                    ? 'text-emerald-400'
                    : skill.ratio >= 0.34
                    ? 'text-brand-cyan'
                    : 'text-amber-400'
                }`}
              >
                {skill.tag}
              </span>
            </div>
            <ProgressBar value={Math.round(skill.ratio * 100)} tone={toneFor(skill.ratio)} size="xs" />
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/25 text-xs text-slate-300">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-white">A trabajar:</strong> {result.gaps[0]?.reason}
        </span>
      </div>
    </div>
  );
}
