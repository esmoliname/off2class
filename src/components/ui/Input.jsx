import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Glass input with optional label, leading icon and hint.
 * Uncontrolled by default; pass value/onChange for controlled usage.
 */
export default function Input({
  label,
  hint,
  icon: Icon,
  className,
  inputClassName,
  id,
  ...rest
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-slate-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        )}
        <input
          id={inputId}
          className={cn(
            'w-full liquid-glass-input text-sm',
            Icon && 'pl-10',
            inputClassName
          )}
          {...rest}
        />
      </div>
      {hint && <p className="mt-1.5 text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}
