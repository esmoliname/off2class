import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Card, Badge } from '../ui';
import OptionSelector from './OptionSelector';
import { cn } from '../../utils/cn';

const TONE_CLASSES = {
  cyan: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
};

/**
 * Main question surface: skill badge, index, prompt and option group.
 */
export default function QuestionCard({ question, index, total, selectedId, onSelect, footer }) {
  if (!question) return null;

  return (
    <Card variant="panel" rounded="xl" className="p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
          <Badge tone={question.skillTone || 'cyan'} size="md" icon={HelpCircle}>
            {question.skillLabel}
          </Badge>
          <span className="text-xs font-mono text-slate-400">
            Pregunta {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <div
          className={cn(
            'rounded-2xl border-l-2 bg-white/[0.03] px-5 py-4 mb-6',
            TONE_CLASSES[question.skillTone] || TONE_CLASSES.cyan
          )}
        >
          <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {question.prompt}
          </p>
        </div>

        <OptionSelector
          options={question.options}
          value={selectedId}
          onSelect={onSelect}
        />

        {footer && <div className="mt-7 pt-5 border-t border-white/[0.07]">{footer}</div>}
      </div>
    </Card>
  );
}
