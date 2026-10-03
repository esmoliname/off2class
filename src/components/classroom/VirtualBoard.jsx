import React, { useState } from 'react';
import {
  Pen,
  Highlighter,
  Eraser,
  Type,
  Square,
  Undo2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { BOARD_STROKES, BOARD_NOTES } from '../../utils/mocks';

const TOOLS = [
  { id: 'pen', icon: Pen, label: 'Lápiz' },
  { id: 'highlight', icon: Highlighter, label: 'Resaltador' },
  { id: 'text', icon: Type, label: 'Texto' },
  { id: 'shape', icon: Square, label: 'Formas' },
  { id: 'eraser', icon: Eraser, label: 'Borrador' },
];

const TONE_STROKE = {
  cyan: '#00F0FF',
  purple: '#a78bfa',
  emerald: '#34d399',
};

/**
 * Virtual whiteboard: frosted toolbar + handwritten SVG strokes surface.
 */
export default function VirtualBoard({ title = 'Pizarra Virtual', className }) {
  const [activeTool, setActiveTool] = useState('pen');
  const [page, setPage] = useState(1);

  return (
    <div className={cn('panel-biolum-purple flex flex-col h-full', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.08] bg-[#0a0e17]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
            <Pen className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-semibold text-white truncate">{title}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                title={tool.label}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  'w-8 h-8 rounded-lg border flex items-center justify-center transition-all',
                  isActive
                    ? 'bg-purple-500/20 border-purple-400/50 text-purple-200 shadow-[0_0_16px_-4px_rgba(167,139,250,0.7)]'
                    : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            );
          })}

          <span className="w-px h-5 bg-white/10 mx-1" />

          <button
            title="Deshacer"
            className="w-8 h-8 rounded-lg border bg-white/[0.04] border-white/10 text-slate-400 hover:text-white hover:border-white/25 flex items-center justify-center transition-all"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            title="Limpiar pizarra"
            className="w-8 h-8 rounded-lg border bg-white/[0.04] border-white/10 text-slate-400 hover:text-red-400 hover:border-red-400/40 flex items-center justify-center transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex-1 min-h-[260px] bg-[#070a11]/70 overflow-hidden">
        {/* ruled grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <svg
          viewBox="0 0 480 260"
          className="relative w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Contenido escrito en la pizarra"
        >
          <text x="38" y="40" fill="#e2e8f0" fontSize="16" fontFamily="Outfit, sans-serif" fontWeight="600">
            Academic Writing · Unit 12
          </text>

          {BOARD_STROKES.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={i % 2 === 0 ? TONE_STROKE.cyan : TONE_STROKE.purple}
              strokeWidth={i === 1 ? 3 : 2.4}
              strokeLinecap="round"
              opacity="0.9"
            />
          ))}

          <text x="40" y="96" fill="#7dd3fc" fontSize="13" fontFamily="JetBrains Mono, monospace">
            put down → register (data)
          </text>
          <text x="40" y="146" fill="#c4b5fd" fontSize="13" fontFamily="JetBrains Mono, monospace">
            carry out → conduct (an experiment)
          </text>
          <text x="40" y="196" fill="#6ee7b7" fontSize="13" fontFamily="JetBrains Mono, monospace">
            point out → highlight (a finding)
          </text>

          <rect x="40" y="222" width="184" height="32" rx="8" fill="rgba(0,240,255,0.08)" stroke="rgba(0,240,255,0.35)" />
          <text x="54" y="242" fill="#a5f3fc" fontSize="11" fontFamily="Inter, sans-serif">
            Task: write 4 sentences
          </text>
        </svg>

        {/* Board notes */}
        <div className="absolute top-4 right-4 hidden sm:flex flex-col gap-2 w-44">
          {BOARD_NOTES.map((note) => (
            <div
              key={note.label}
              className={cn(
                'px-3 py-2 rounded-xl border backdrop-blur-md text-[11px]',
                note.tone === 'cyan' && 'bg-brand-cyan/10 border-brand-cyan/30 text-cyan-100',
                note.tone === 'purple' && 'bg-purple-500/10 border-purple-400/30 text-purple-100',
                note.tone === 'emerald' && 'bg-emerald-500/10 border-emerald-400/30 text-emerald-100'
              )}
            >
              <span className="block font-bold uppercase tracking-wide text-[9px] opacity-70 mb-0.5">
                {note.label}
              </span>
              {note.value}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] bg-[#0a0e17]/80 text-[11px] text-slate-400">
        <span className="font-mono">slide {page} / 6</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/10 hover:border-white/25 flex items-center justify-center"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(6, p + 1))}
            className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/10 hover:border-white/25 flex items-center justify-center"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
