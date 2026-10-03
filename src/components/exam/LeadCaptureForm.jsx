import React from 'react';
import { Mail, User, MessageSquare, Lock, ArrowRight } from 'lucide-react';
import { Button, Input } from '../ui';

/**
 * Lead gate between the last question and the full report.
 * The partial result stays visible above the form (conversion pattern).
 */
export default function LeadCaptureForm({ result, form, onFieldChange, onSubmit }) {
  return (
    <div className="mt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
        className="space-y-3"
      >
        <p className="text-xs text-slate-300 flex items-start gap-2">
          <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-cyan" />
          <span>
            Dejanos tu email y te enviamos el{' '}
            <strong className="text-white">plan completo de estudio</strong> con tu ruta CEFR
            detallada.
          </span>
        </p>

        <Input
          type="text"
          required
          icon={User}
          placeholder="Tu nombre completo"
          value={form.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
        />

        <Input
          type="email"
          required
          icon={Mail}
          placeholder="tu@email.com"
          value={form.email}
          onChange={(e) => onFieldChange('email', e.target.value)}
        />

        <Input
          type="tel"
          icon={MessageSquare}
          placeholder="WhatsApp (opcional)"
          value={form.whatsapp}
          onChange={(e) => onFieldChange('whatsapp', e.target.value)}
        />

        <Button type="submit" variant="primary" size="md" fullWidth>
          <span>Ver Mi Plan Completo de Estudio</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
