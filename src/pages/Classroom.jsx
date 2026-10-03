import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Circle, Signal, Sparkles } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import AmbientGlow from '../components/layout/AmbientGlow';
import { Badge } from '../components/ui';
import VideoFeed from '../components/classroom/VideoFeed';
import VirtualBoard from '../components/classroom/VirtualBoard';
import LessonSidebar from '../components/classroom/LessonSidebar';
import ControlDock from '../components/classroom/ControlDock';
import BridgeCTA from '../components/shared/BridgeCTA';
import { CLASSROOM_LESSON, CLASSROOM_CHAT, MOCK_STUDENT } from '../utils/mocks';
import { VIEWS } from '../utils/constants';

const START_OFFSET = 38 * 60 + 12; // 00:38:12

function formatElapsed(totalSeconds) {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/**
 * Vista 3 — Sala de clase en vivo (videollamada + pizarra + chat).
 */
export default function Classroom({ onNavigate, student }) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [messages, setMessages] = useState(CLASSROOM_CHAT);
  const [elapsed, setElapsed] = useState(START_OFFSET);

  const learner = student || MOCK_STUDENT;

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const timer = useMemo(() => formatElapsed(elapsed), [elapsed]);

  const handleSendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        sender: learner.name,
        role: 'Estudiante',
        avatar: learner.avatarUrl,
        content: text,
        time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        self: true,
      },
    ]);
  };

  return (
    <main className="min-h-screen pt-28 pb-40 relative">
      <AmbientGlow tone="cyan" className="top-0 -left-24" />
      <AmbientGlow tone="purple" className="bottom-10 -right-24" />

      <PageContainer className="relative z-10">
        {/* Room header */}
        <div className="liquid-glass rounded-2xl px-5 py-4 mb-5 border-white/10 specular-border flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => onNavigate(VIEWS.LANDING)}
              className="w-9 h-9 shrink-0 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/25 flex items-center justify-center text-slate-300 hover:text-white transition-all"
              title="Volver al inicio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base font-bold text-white truncate">
                  {CLASSROOM_LESSON.title}
                </h1>
                <Badge tone="cyan" size="xs">
                  {CLASSROOM_LESSON.level}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {CLASSROOM_LESSON.teacher.name} · {CLASSROOM_LESSON.teacher.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-[11px] font-bold text-red-400 uppercase tracking-wider">
              <Circle className="w-2.5 h-2.5 fill-current animate-pulse" />
              REC
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-slate-200 font-mono">
              {timer}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-400">
              <Signal className="w-3.5 h-3.5" />
              Conexión estable
            </span>
            <BridgeCTA variant="nav" source="classroom_header" label="Material Off2Class" />
          </div>
        </div>

        {/* Grid */}
        <div
          className={`grid gap-5 items-stretch ${
            panelOpen ? 'grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]' : 'grid-cols-1'
          }`}
        >
          {/* Stage */}
          <div className="flex flex-col gap-5 min-w-0">
            <VideoFeed
              src={CLASSROOM_LESSON.teacher.avatar}
              name={CLASSROOM_LESSON.teacher.name}
              role={CLASSROOM_LESSON.teacher.role}
              speaking={CLASSROOM_LESSON.teacher.speaking}
              selfSrc={learner.avatarUrl}
              selfMuted={!micOn}
            />

            <VirtualBoard
              title={`${CLASSROOM_LESSON.title} · Pizarra`}
              className="min-h-[340px]"
            />
          </div>

          {/* Side panel */}
          {panelOpen && (
            <LessonSidebar
              messages={messages}
              onSendMessage={handleSendMessage}
              className="h-[520px] lg:h-auto lg:min-h-[640px]"
            />
          )}
        </div>
      </PageContainer>

      {/* Floating control dock */}
      <ControlDock
        micOn={micOn}
        camOn={camOn}
        handRaised={handRaised}
        chatOpen={panelOpen}
        onToggleMic={() => setMicOn((v) => !v)}
        onToggleCam={() => setCamOn((v) => !v)}
        onToggleHand={() => setHandRaised((v) => !v)}
        onToggleChat={() => setPanelOpen((v) => !v)}
        onLeave={() => onNavigate(VIEWS.LANDING)}
      />

      {handRaised && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 liquid-glass rounded-full px-4 py-2 border-brand-cyan/40 text-xs text-brand-cyan flex items-center gap-2 shadow-glow-cyan">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mano levantada · el profesor ya te ve</span>
        </div>
      )}
    </main>
  );
}
