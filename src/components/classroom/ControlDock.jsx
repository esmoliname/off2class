import React from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Hand,
  MessageSquare,
  Settings,
  PhoneOff,
} from 'lucide-react';
import { cn } from '../../utils/cn';

function DockItem({ label, active, danger, onClick, children }) {
  return (
    <button
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'relative h-11 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-90',
        danger
          ? 'px-4 gap-2 bg-gradient-to-br from-red-500 to-rose-600 border-red-400/40 text-white shadow-[0_0_22px_-4px_rgba(244,63,94,0.75)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)]'
          : 'w-11',
        !danger &&
          (active
            ? 'bg-brand-cyan/15 border-brand-cyan/50 text-brand-cyan shadow-glow-cyan'
            : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/[0.1]')
      )}
    >
      {children}
    </button>
  );
}

/**
 * Floating translucent control dock (FaceTime / Zoom Pro style).
 */
export default function ControlDock({
  micOn,
  camOn,
  handRaised,
  chatOpen,
  onToggleMic,
  onToggleCam,
  onToggleHand,
  onToggleChat,
  onLeave,
  className,
}) {
  return (
    <div
      className={cn(
        'fixed left-1/2 bottom-6 z-40 dock-glass rounded-full px-3 py-2.5 flex items-center gap-2 animate-dock-in',
        className
      )}
    >
      <DockItem label={micOn ? 'Silenciar micrófono' : 'Activar micrófono'} active={micOn} onClick={onToggleMic}>
        {micOn ? <Mic className="w-[18px] h-[18px]" /> : <MicOff className="w-[18px] h-[18px] text-red-400" />}
      </DockItem>

      <DockItem label={camOn ? 'Apagar cámara' : 'Encender cámara'} active={camOn} onClick={onToggleCam}>
        {camOn ? <Video className="w-[18px] h-[18px]" /> : <VideoOff className="w-[18px] h-[18px] text-red-400" />}
      </DockItem>

      <DockItem label="Compartir pantalla">
        <MonitorUp className="w-[18px] h-[18px]" />
      </DockItem>

      <DockItem label={handRaised ? 'Bajar mano' : 'Levantar mano'} active={handRaised} onClick={onToggleHand}>
        <Hand className="w-[18px] h-[18px]" />
      </DockItem>

      <span className="w-px h-7 bg-white/10 mx-1" />

      <DockItem label="Chat de la clase" active={chatOpen} onClick={onToggleChat}>
        <MessageSquare className="w-[18px] h-[18px]" />
        {chatOpen && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-cyan" />}
      </DockItem>

      <DockItem label="Configuración">
        <Settings className="w-[18px] h-[18px]" />
      </DockItem>

      <DockItem label="Salir de la clase" danger onClick={onLeave}>
        <PhoneOff className="w-[18px] h-[18px]" />
        <span className="hidden sm:inline text-xs font-bold">Salir</span>
      </DockItem>
    </div>
  );
}
