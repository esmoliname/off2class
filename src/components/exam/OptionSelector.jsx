import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f'];

/**
 * Custom radio group with hover / active / selected states.
 * @param {{options: Array<{id: string, text: string}>}} props
 */
export default function OptionSelector({ options, value, onSelect, disabled = false }) {
  return (
    <div role="radiogroup" aria-label="Opciones de respuesta" className="space-y-3">
      {options.map((option, idx) => {
        const isSelected = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onSelect?.(option.id)}
            className={cn(
              'group w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200',
              'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.995]',
              isSelected
                ? 'bg-brand-cyan/10 border-brand-cyan/55 shadow-glow-cyan'
                : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/25',
              disabled && 'pointer-events-none opacity-70'
            )}
          >
            {/* Radio indicator */}
            <span
              className={cn(
                'w-7 h-7 shrink-0 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-all duration-200',
                isSelected
                  ? 'bg-brand-cyan border-brand-cyan text-slate-950 scale-110'
                  : 'border-white/25 text-slate-400 group-hover:border-brand-cyan/60 group-hover:text-brand-cyan'
              )}
            >
              {isSelected ? <Check className="w-3.5 h-3.5" /> : LETTERS[idx]}
            </span>

            <span
              className={cn(
                'text-sm font-medium transition-colors',
                isSelected ? 'text-white' : 'text-slate-300 group-hover:text-slate-100'
              )}
            >
              {option.text}
            </span>
          </button>
        );
      })}
    </div>
  );
}
