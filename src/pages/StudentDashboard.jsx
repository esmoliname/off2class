import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  MessageSquare,
  Send,
  Cpu,
  CheckCircle,
  Play,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Mic,
  HelpCircle,
  Info,
  Radio
} from 'lucide-react';
import BridgeCTA, { openBridge } from '../components/shared/BridgeCTA';
import { VIEWS } from '../utils/constants';
import {
  AI_RECOMMENDATIONS,
  VERNEVAL_CHANNELS,
  INITIAL_VERNEVAL_MESSAGES
} from '../utils/mocks';

const channelIconMap = {
  Globe: Globe,
  Mic: Mic,
  HelpCircle: HelpCircle,
  BookOpen: BookOpen,
};

export default function StudentDashboard({ student, onOpenCalendly, onNavigate }) {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState(INITIAL_VERNEVAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'verneval' | 'ai-tutor'
  const [completedLessons, setCompletedLessons] = useState([]);
  const [alertNotice, setAlertNotice] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsgObj = {
      id: `msg-${Date.now()}`,
      channel: activeChannel,
      sender: student.name,
      role: 'Estudiante',
      avatar: student.avatarUrl,
      content: newMessage.trim(),
      timestamp: 'Ahora mismo',
      likes: 0
    };

    setMessages([...messages, newMsgObj]);
    setNewMessage('');

    // Optional simulated teacher auto-reply after 1.5 seconds if channel is grammar
    if (activeChannel === 'grammar-qa') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-reply-${Date.now()}`,
            channel: 'grammar-qa',
            sender: 'Verneval AI Mentor',
            role: 'Tutor Pedagógico',
            avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
            content: `¡Excelente consulta, ${student.name.split(' ')[0]}! Analizamos tu mensaje con las pautas de Off2Class. Recordá que para expresar arrepentimiento en el pasado usamos "I wish I had + past participle".`,
            timestamp: 'Ahora mismo',
            likes: 1
          }
        ]);
      }, 1200);
    }
  };

  const handleLaunchLesson = (rec) => {
    setCompletedLessons((prev) => [...prev, rec.id]);
    setAlertNotice(`Conectando con Off2Class para la lección: "${rec.title}" (Código: ${rec.off2classLessonCode || 'AI-SYNC'})`);
    setTimeout(() => {
      openBridge({ lessonCode: rec.off2classLessonCode, source: 'ai_recommendation' });
      setAlertNotice(null);
    }, 1500);
  };

  const filteredMessages = messages.filter((m) => m.channel === activeChannel);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* Background Glows */}
      <div className="ambient-glow-cyan top-20 -left-10" />
      <div className="ambient-glow-purple top-60 -right-10" />

      {/* Notification Toast */}
      {alertNotice && (
        <div className="fixed bottom-6 right-6 z-50 liquid-glass border-brand-cyan/60 rounded-2xl p-4 shadow-glow-cyan max-w-md animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shrink-0 animate-spin">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-white">Puente Off2Class Whitelabel Activo</p>
              <p className="text-slate-300 mt-0.5">{alertNotice}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header / Student Welcome */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 mb-8 border-white/10 specular-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Profile Details */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-brand-cyan/60 shadow-glow-cyan"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0a0e17] flex items-center justify-center" title="En línea">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Hola, {student.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                  {student.currentLevel}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {student.program} • ID: <span className="font-mono text-slate-300">{student.id}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">{student.streakDays} Días</div>
                <div className="text-[10px] text-slate-300">Racha de Estudio</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">{student.stats.avgAccuracy}</div>
                <div className="text-[10px] text-slate-300">Precisión Global</div>
              </div>
            </div>

            <button
              onClick={onOpenCalendly}
              className="btn-liquid-secondary !py-2.5 !px-4 text-xs"
            >
              <Clock className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Pedir Tutoría 1:1</span>
            </button>

            <button
              onClick={() => onNavigate?.(VIEWS.CLASSROOM)}
              className="btn-liquid-secondary !py-2.5 !px-4 text-xs border-emerald-500/40 hover:border-emerald-400/70 hover:bg-emerald-500/10"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Entrar a la Clase en Vivo</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRIMARY HIGHLIGHT: Off2Class Whitelabel Redirection Bridge */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 mb-8 border-brand-cyan/40 bg-gradient-to-r from-[#0d1424]/90 via-[#0e172a]/90 to-[#121c33]/90 specular-border shadow-[0_0_40px_rgba(0,240,255,0.12)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-xs font-semibold text-brand-cyan mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Puente Directo de Marca Blanca • Off2Class SSO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Tu Aula Virtual Interactiva está Lista
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Ingresá de inmediato a tu panel oficial de <span className="text-brand-cyan font-semibold">Off2Class</span> con tu sesión universitaria activa. Accedé a diapositivas en vivo, tareas asignadas por tus profesores y banco de ejercicios sin necesidad de volver a iniciar sesión.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Subdominio Autorizado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Token SSO Sincronizado</span>
              </div>
            </div>
          </div>

          {/* MAIN PROMINENT BUTTON */}
          <BridgeCTA variant="primary" source="dashboard_bridge" showDestination />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-white/10 text-white border border-white/15 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          Resumen & Recomendaciones IA
        </button>
        <button
          onClick={() => setActiveTab('verneval')}
          className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'verneval'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-glow-cyan'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Comunidad Verneval</span>
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
        </button>
      </div>

      {/* TAB 1: OVERVIEW & AI RECOMMENDATIONS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Progress & CEFR Radar (1 col) */}
          <div className="lg:col-span-1 space-y-6">
            {/* General progress card */}
            <div className="liquid-glass-card rounded-3xl p-6 border-white/10 specular-border">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-cyan" />
                <span>Progreso Hacia C1</span>
              </h3>

              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-300">Completitud del Módulo</span>
                  <span className="text-brand-cyan font-mono font-bold">{student.completionRate}%</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brand-cyan to-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${student.completionRate}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.08]">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[11px] text-slate-300">Lecciones Hechas</div>
                  <div className="text-lg font-bold text-white mt-0.5">{student.stats.lessonsCompleted}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[11px] text-slate-300">Horas Totales</div>
                  <div className="text-lg font-bold text-white mt-0.5">{student.stats.hoursLogged} h</div>
                </div>
              </div>
            </div>

            {/* CEFR Skill Breakdown */}
            <div className="liquid-glass-card rounded-3xl p-6 border-white/10 specular-border">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Desglose por Habilidad (CEFR)</span>
              </h3>

              <div className="space-y-4">
                {student.cefrBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{item.skill}</span>
                      <span className="text-white font-mono font-semibold">{item.level} ({item.score}%)</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.score >= 85
                            ? 'bg-emerald-400'
                            : item.score >= 75
                            ? 'bg-brand-cyan'
                            : 'bg-amber-400'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Lesson Recommender (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border-white/10 specular-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shadow-glow-cyan">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Recomendador Adaptativo con IA</h3>
                    <p className="text-xs text-slate-300">Rutas de aprendizaje personalizadas a partir de tus errores y fortalezas</p>
                  </div>
                </div>

                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-slate-300 font-mono">
                  Engine v2.4 Active
                </span>
              </div>

              {/* Recommendations list */}
              <div className="space-y-4">
                {AI_RECOMMENDATIONS.map((rec) => {
                  const isDone = completedLessons.includes(rec.id);

                  return (
                    <div
                      key={rec.id}
                      className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                              {rec.skill}
                            </span>
                            <span className="text-[10px] font-mono text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
                              Nivel {rec.difficulty}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              {rec.confidenceBoost}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white group-hover:text-brand-cyan">
                            {rec.title}
                          </h4>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {rec.reason}
                          </p>

                          <div className="flex items-center gap-4 text-[11px] text-slate-300 pt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {rec.estimatedTime}
                            </span>
                            {rec.isOff2ClassLesson && (
                              <span className="flex items-center gap-1 text-brand-cyan font-mono">
                                Código Off2Class: {rec.off2classLessonCode}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="shrink-0">
                          {isDone ? (
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                              <CheckCircle className="w-4 h-4" />
                              <span>En Progreso</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleLaunchLesson(rec)}
                              className="btn-liquid-primary !py-2.5 !px-5 text-xs font-semibold w-full sm:w-auto"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Lanzar Lección</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VERNEVAL COMMUNITY / CHAT MODULE */}
      {activeTab === 'verneval' && (
        <div className="liquid-glass rounded-3xl border-white/10 specular-border overflow-hidden grid grid-cols-1 md:grid-cols-4 min-h-[580px]">
          {/* Channels Sidebar */}
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-white/10 p-4 bg-[#0a0e17]/80">
            <div className="flex items-center gap-2 mb-4 px-2">
              <MessageSquare className="w-4 h-4 text-brand-cyan" />
              <h3 className="font-bold text-sm text-white">Comunidad Verneval</h3>
            </div>

            <div className="space-y-1">
              {VERNEVAL_CHANNELS.map((ch) => {
                const IconComponent = channelIconMap[ch.icon] || Globe;
                const isActive = activeChannel === ch.id;

                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      isActive
                        ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-glow-cyan'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span className="truncate">{ch.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs">
              <div className="flex items-center gap-1.5 text-brand-cyan font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>IA Feedback Activo</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Tus intervenciones en el canal de gramática y speaking son evaluadas por el tutor pedagógico inteligente.
              </p>
            </div>
          </div>

          {/* Chat Window */}
          <div className="md:col-span-3 flex flex-col justify-between p-6 bg-[#080c14]/60">
            {/* Active Channel Header */}
            <div className="pb-4 border-b border-white/10 mb-4 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>#{VERNEVAL_CHANNELS.find((c) => c.id === activeChannel)?.name}</span>
                </h4>
                <p className="text-xs text-slate-300">
                  {VERNEVAL_CHANNELS.find((c) => c.id === activeChannel)?.label}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>18 estudiantes conectados</span>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 max-h-[400px]">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Aún no hay mensajes en este canal. ¡Sé el primero en participar!
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 group">
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-white/20"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white">{msg.sender}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10">
                          {msg.role}
                        </span>
                        <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 leading-relaxed group-hover:border-white/20 transition-colors">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Send Message Box */}
            <form onSubmit={handleSendMessage} className="relative pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Escribí en #${VERNEVAL_CHANNELS.find((c) => c.id === activeChannel)?.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 liquid-glass-input text-xs"
                />
                <button
                  type="submit"
                  className="btn-liquid-primary !py-2.5 !px-5 text-xs font-semibold shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
