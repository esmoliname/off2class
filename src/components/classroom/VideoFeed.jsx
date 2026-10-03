import React from 'react';
import { Mic, MicOff, Wifi } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Main video tile (teacher feed) with floating HUD:
 * live badge, name plate, connection quality and a self-view PiP.
 */
export default function VideoFeed({
  src,
  name,
  role,
  speaking = false,
  live = true,
  connection = 'Excelente',
  selfSrc,
  selfMuted = true,
  className,
}) {
  return (
    <div className={cn('panel-biolum aspect-video', className)}>
      <img
        src={src}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070c]/95 via-[#05070c]/25 to-[#05070c]/45" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
        {live && (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            En vivo
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-slate-200">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          {connection}
        </span>
      </div>

      {/* Name plate */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3 pr-4 py-2 pl-2 rounded-2xl bg-black/55 backdrop-blur-md border border-white/10">
        <img
          src={src}
          alt=""
          className={cn(
            'w-9 h-9 rounded-xl object-cover',
            speaking ? 'ring-2 ring-emerald-400 animate-speaking' : 'ring-1 ring-white/20'
          )}
        />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-[11px] text-slate-300">{role}</div>
        </div>
        <span className="ml-1 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-emerald-400">
          <Mic className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Self view PiP */}
      {selfSrc && (
        <div className="absolute bottom-4 right-4 w-28 sm:w-36 aspect-[4/3] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#0a0e17]">
          <img src={selfSrc} alt="Tú" className="w-full h-full object-cover opacity-90" />
          <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/60 text-[10px] font-medium text-slate-200">
            {selfMuted ? <MicOff className="w-3 h-3 text-red-400" /> : <Mic className="w-3 h-3 text-emerald-400" />}
            Tú
          </span>
        </div>
      )}

      {/* Speaking halo */}
      {speaking && (
        <span className="absolute inset-0 rounded-2xl border-2 border-emerald-400/50 pointer-events-none" />
      )}
    </div>
  );
}
