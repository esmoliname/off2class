import React, { useState } from 'react';
import { MessagesSquare, Users, BookOpen, ShieldCheck } from 'lucide-react';
import ClassChat from './ClassChat';
import { cn } from '../../utils/cn';
import { CLASSROOM_LESSON, BOARD_NOTES } from '../../utils/mocks';

const TABS = [
  { id: 'chat', label: 'Chat', icon: MessagesSquare },
  { id: 'people', label: 'Participantes', icon: Users },
  { id: 'material', label: 'Material', icon: BookOpen },
];

/**
 * Right column of the classroom: chat / participants / lesson material.
 */
export default function LessonSidebar({ messages, onSendMessage, className }) {
  const [tab, setTab] = useState('chat');
  const activeTab = tab;

  const participants = CLASSROOM_LESSON.participants;

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0e17]/80 backdrop-blur-xl shadow-glass min-h-0',
        className
      )}
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 p-2 border-b border-white/[0.08]">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold transition-all',
                isActive
                  ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panels */}
      {activeTab === 'chat' && (
        <ClassChat messages={messages} onSend={onSendMessage} className="flex-1 min-h-0" />
      )}

      {activeTab === 'people' && (
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-white">En la sala</h4>
            <span className="text-[11px] text-slate-400 font-mono">
              {participants.length} conectados
            </span>
          </div>

          {participants.map((p) => (
            <div
              key={p.id}
              className={cn(
                'flex items-center gap-3 p-2.5 rounded-xl border transition-all',
                p.speaking
                  ? 'bg-emerald-500/[0.07] border-emerald-500/30'
                  : 'bg-white/[0.03] border-white/[0.07]'
              )}
            >
              <img
                src={p.avatar}
                alt={p.name}
                className={cn(
                  'w-9 h-9 rounded-full object-cover',
                  p.speaking ? 'ring-2 ring-emerald-400 animate-speaking' : 'ring-1 ring-white/15'
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">
                  {p.name}
                  {p.you && <span className="text-brand-cyan"> (vos)</span>}
                </div>
                <div className="text-[10px] text-slate-400">Nivel {p.level}</div>
              </div>
              <span
                className={cn(
                  'w-6 h-6 rounded-full border flex items-center justify-center text-[10px]',
                  p.speaking
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                    : 'bg-white/[0.04] border-white/10 text-slate-500'
                )}
              >
                {p.speaking ? 'ON' : '—'}
              </span>
            </div>
          ))}

          <div className="mt-4 p-3 rounded-xl bg-brand-cyan/[0.06] border border-brand-cyan/20 text-[11px] text-slate-300 flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
            <span>
              Sala protegida con SSO Off2Class. Solo alumnos matriculados en {CLASSROOM_LESSON.level}{' '}
              pueden ingresar.
            </span>
          </div>
        </div>
      )}

      {activeTab === 'material' && (
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-xs font-bold text-white">{CLASSROOM_LESSON.title}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Diapositivas oficiales y tarea asíncrona sincronizadas con tu cuenta Off2Class.
            </p>
            <div className="mt-2.5 text-[11px] font-mono text-brand-cyan">
              Código: {CLASSROOM_LESSON.off2classLessonCode}
            </div>
          </div>

          <div className="space-y-2">
            {BOARD_NOTES.map((note) => (
              <div
                key={note.label}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-xs"
              >
                <span className="text-slate-300">{note.value}</span>
                <span className="text-[10px] uppercase tracking-wide text-slate-500">
                  {note.label}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-purple-500/[0.07] border border-purple-400/25 text-[11px] text-slate-300">
            <span className="block font-semibold text-purple-300 mb-1">Tarea para la próxima clase</span>
            Escribí 4 oraciones usando los phrasal verbs de la pizarra y subilas al campus antes
            del viernes.
          </div>
        </div>
      )}
    </div>
  );
}
