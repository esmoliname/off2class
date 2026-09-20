import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AuthModal from './components/AuthModal';
import CalendlyModal from './components/CalendlyModal';
import Footer from './components/Footer';
import { MOCK_STUDENT } from './utils/constants';
import { CheckCircle2, X, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for rich initial demo
  const [user, setUser] = useState(MOCK_STUDENT);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isPlacementTestOpen, setIsPlacementTestOpen] = useState(false);

  // Placement Test Quick Modal Flow state
  const [placementStep, setPlacementStep] = useState(1);
  const [placementAnswers, setPlacementAnswers] = useState({});
  const [placementResult, setPlacementResult] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('landing');
  };

  const handlePlacementAnswer = (questionIndex, answer) => {
    const updated = { ...placementAnswers, [questionIndex]: answer };
    setPlacementAnswers(updated);

    if (questionIndex < 2) {
      setPlacementStep(questionIndex + 2);
    } else {
      // Finished 3 demo diagnostic questions
      setPlacementResult({
        level: 'B2.1 (Independent User)',
        score: '84%',
        strengths: 'Comprensión contextual y vocabulario académico',
        weakness: 'Condicionales mixtos y tiempos perfectos'
      });
      setPlacementStep(4);
    }
  };

  const resetPlacementTest = () => {
    setIsPlacementTestOpen(false);
    setPlacementStep(1);
    setPlacementAnswers({});
    setPlacementResult(null);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-brand-cyan/20 selection:text-brand-cyan">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAuthenticated={isAuthenticated}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage
            onOpenCalendly={() => setIsCalendlyOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            onStartPlacementTest={() => setIsPlacementTestOpen(true)}
            onSelectCourse={(course) => {
              if (!isAuthenticated) {
                setIsAuthOpen(true);
              } else {
                setCurrentView('dashboard');
              }
            }}
          />
        ) : (
          <StudentDashboard
            student={user || MOCK_STUDENT}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}
      </div>

      {/* Footer */}
      <Footer
        onOpenCalendly={() => setIsCalendlyOpen(true)}
        onStartPlacementTest={() => setIsPlacementTestOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Calendly Booking Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />

      {/* Interactive Quick Placement Test Modal */}
      {isPlacementTestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="liquid-glass rounded-3xl w-full max-w-xl border-white/20 specular-border shadow-2xl p-6 sm:p-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={resetPlacementTest}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.15] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Test de Ubicación Rápido CEFR</h3>
                <p className="text-xs text-slate-400">Diagnóstico interactivo algorítmico Off2Class</p>
              </div>
            </div>

            {placementStep === 1 && (
              <div>
                <div className="text-xs font-mono text-brand-cyan mb-2">Pregunta 1 de 3 • Gramática Aplicada</div>
                <h4 className="text-base font-semibold text-white mb-4">
                  "If the university board _______ earlier, we would have adjusted our academic syllabus."
                </h4>
                <div className="space-y-2.5">
                  {[
                    'notified',
                    'had notified',
                    'would notify',
                    'has notified'
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePlacementAnswer(0, option)}
                      className="w-full text-left p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-cyan/50 hover:bg-white/[0.08] text-xs font-medium text-slate-200 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {placementStep === 2 && (
              <div>
                <div className="text-xs font-mono text-brand-cyan mb-2">Pregunta 2 de 3 • Vocabulario y Registro Formal</div>
                <h4 className="text-base font-semibold text-white mb-4">
                  Which term best fits a high-level academic paper: "The research findings strongly _______ the initial hypothesis."
                </h4>
                <div className="space-y-2.5">
                  {[
                    'corroborate',
                    'back up somewhat',
                    'give a thumbs up to',
                    'stand for'
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePlacementAnswer(1, option)}
                      className="w-full text-left p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-cyan/50 hover:bg-white/[0.08] text-xs font-medium text-slate-200 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {placementStep === 3 && (
              <div>
                <div className="text-xs font-mono text-brand-cyan mb-2">Pregunta 3 de 3 • Listening & Inference</div>
                <h4 className="text-base font-semibold text-white mb-4">
                  Speaker A: "I thought the lecture was rather convoluted." — What does Speaker A mean?
                </h4>
                <div className="space-y-2.5">
                  {[
                    'The lecture was straightforward and clear.',
                    'The lecture was overly complicated and difficult to follow.',
                    'The lecture ended earlier than expected.',
                    'The speaker disagreed with the conclusions.'
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePlacementAnswer(2, option)}
                      className="w-full text-left p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-cyan/50 hover:bg-white/[0.08] text-xs font-medium text-slate-200 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {placementStep === 4 && placementResult && (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-glow-cyan">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">¡Diagnóstico Completado con Éxito!</h4>
                <p className="text-xs text-slate-400 mb-6">Tu nivel estimado según la escala internacional CEFR:</p>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-brand-cyan/30 text-left mb-6 space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-xs text-slate-300">Nivel Recomendado:</span>
                    <span className="text-sm font-bold text-brand-cyan">{placementResult.level}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Puntaje Global:</span>
                    <span className="text-emerald-400 font-bold">{placementResult.score}</span>
                  </div>
                  <div className="text-xs text-slate-400 pt-1">
                    <strong className="text-white">Fortalezas:</strong> {placementResult.strengths}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      resetPlacementTest();
                      setCurrentView('dashboard');
                    }}
                    className="btn-liquid-primary !py-3 !px-6 text-xs flex-1"
                  >
                    <span>Ir al Campus y Ver Ruta de Lecciones</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      resetPlacementTest();
                      setIsCalendlyOpen(true);
                    }}
                    className="btn-liquid-secondary !py-3 !px-6 text-xs"
                  >
                    Validar con Mentor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
