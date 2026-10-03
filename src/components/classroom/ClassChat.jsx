import React, { useEffect, useRef, useState } from 'react';
import { Send, MessagesSquare } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * In-class chat: high-contrast message stream + glass composer.
 */
export default function ClassChat({ messages = [], onSend, className }) {
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const submit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend?.(draft.trim());
    setDraft('');
  };

  return (
    <div className={cn('flex flex-col h-full min-h-0', className)}>
      {/* Stream */}
      <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <MessagesSquare className="w-7 h-7 text-slate-600 mb-2" />
            <p className="text-xs text-slate-500">
              Todavía no hay mensajes. ¡Abrí la conversación!
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={cn('flex items-start gap-3', msg.self && 'flex-row-reverse')}>
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-white/15"
              />
              <div className={cn('min-w-0 max-w-[85%]', msg.self && 'text-right')}>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-bold text-white">{msg.sender}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10">
                    {msg.role}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{msg.time}</span>
                </div>
                <div
                  className={cn(
                    'px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed border text-left',
                    msg.self
                      ? 'bg-brand-cyan/15 border-brand-cyan/40 text-cyan-50 rounded-br-md'
                      : 'bg-white/[0.05] border-white/10 text-slate-200 rounded-bl-md'
                  )}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Composer */}
      <form onSubmit={submit} className="p-3 border-t border-white/[0.08] bg-[#0a0e17]/70">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Escribí en el chat de la clase…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="flex-1 liquid-glass-input !text-xs !py-2.5"
            aria-label="Mensaje"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className={cn(
              'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all',
              draft.trim()
                ? 'bg-gradient-to-br from-brand-cyan to-teal-400 text-slate-950 shadow-glow-cyan active:scale-95'
                : 'bg-white/[0.05] border border-white/10 text-slate-500'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
