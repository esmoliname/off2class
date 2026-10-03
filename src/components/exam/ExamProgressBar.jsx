import React from 'react';
import { ProgressBar } from '../ui';

/**
 * Minimalist exam progress line: label + percentage + thin gradient track.
 */
export default function ExamProgressBar({ value, answered, total }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-300">
          Progreso del examen
          {typeof answered === 'number' && (
            <span className="text-slate-500 font-normal">
              {' '}
              · {answered}/{total} respondidas
            </span>
          )}
        </span>
        <span className="text-xs font-mono font-bold text-brand-cyan">{value}% Complete</span>
      </div>
      <ProgressBar value={value} tone="cyan" size="sm" />
    </div>
  );
}
