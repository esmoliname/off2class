import React, { useState } from 'react';
import { Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import { Modal, Button, Input } from '../ui';
import { CALENDLY_BOOKING_URL } from '../../utils/constants';

export default function CalendlyModal({ isOpen, onClose }) {
  const [selectedTopic, setSelectedTopic] = useState('placement-review');
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedTime, setSelectedTime] = useState('16:00');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ name: '', email: '', note: '' });

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const handleReset = () => {
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} label="Agendar asesoría" size="xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

      {bookingConfirmed ? (
        <div className="py-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">¡Asesoría Académica Agendada!</h3>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Hemos reservado tu sesión virtual para el <strong>{selectedDate}</strong> a las{' '}
            <strong>{selectedTime} hrs</strong>. Te enviamos la invitación de Google Meet y los
            detalles a tu correo electrónico.
          </p>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left mb-6 text-xs space-y-1.5">
            <div className="text-slate-400">
              Modalidad:{' '}
              <span className="text-white font-medium">Videollamada 1 a 1 (Google Meet / Zoom)</span>
            </div>
            <div className="text-slate-400">
              Duración: <span className="text-white font-medium">20 minutos</span>
            </div>
            <div className="text-slate-400">
              Mentor: <span className="text-white font-medium">Coordinador Académico Globaltest English</span>
            </div>
          </div>
          <Button onClick={handleReset} variant="primary" size="md">
            Entendido, volver al sitio
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-6 pr-10">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Agendar Asesoría Pedagógica
              </h3>
              <p className="text-xs text-slate-300">
                Sincronización directa vía Calendly & Coordinación Académica
              </p>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Objetivo de la sesión
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'placement-review', label: 'Revisión de Nivel', desc: 'Análisis de diagnóstico CEFR' },
                  { id: 'exam-strategy', label: 'Estrategia de Examen', desc: 'IELTS / TOEFL / Cambridge' },
                  { id: 'course-selection', label: 'Selección de Plan', desc: 'Clases 1 a 1 o Grupales' },
                ].map((topic) => (
                  <button
                    type="button"
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs ${
                      selectedTopic === topic.id
                        ? 'bg-brand-cyan/15 border-brand-cyan/50 text-white shadow-glow-cyan'
                        : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="font-semibold">{topic.label}</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">{topic.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Fecha disponible
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full liquid-glass-input text-xs"
                >
                  <option value="2026-09-22" className="bg-[#0e131f] text-white">
                    Martes, 22 de Septiembre
                  </option>
                  <option value="2026-09-23" className="bg-[#0e131f] text-white">
                    Miércoles, 23 de Septiembre
                  </option>
                  <option value="2026-09-24" className="bg-[#0e131f] text-white">
                    Jueves, 24 de Septiembre
                  </option>
                  <option value="2026-09-25" className="bg-[#0e131f] text-white">
                    Viernes, 25 de Septiembre
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Horario (Zona horaria local)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00', '11:30', '15:00', '16:00', '17:30', '19:00'].map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-medium border transition-all ${
                        selectedTime === time
                          ? 'bg-brand-cyan text-slate-950 font-bold border-brand-cyan shadow-glow-cyan'
                          : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Input
                label="Nombre completo"
                type="text"
                required
                placeholder="Ej. Sofía Valenzuela"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
              />
              <Input
                label="Correo electrónico"
                type="email"
                required
                placeholder="alumno@ejemplo.com"
                value={studentInfo.email}
                onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
              />
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={CALENDLY_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-brand-cyan flex items-center gap-1 transition-colors"
              >
                <span>Abrir en Calendly web externo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleReset}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" size="sm" className="w-full sm:w-auto">
                  Confirmar Cita Virtual
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
