import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AuthModal from './components/AuthModal';
import CalendlyModal from './components/CalendlyModal';
import Footer from './components/Footer';
import PlacementTestModal from './features/placement-test/PlacementTestModal';
import { useSession } from './features/auth/useSession';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  // Session-backed auth: starts logged out unless a persisted session exists
  const { user, isAuthenticated, login, logout } = useSession();

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isPlacementTestOpen, setIsPlacementTestOpen] = useState(false);
  // Email captured by the placement test, pre-filled into AuthModal
  const [prefillEmail, setPrefillEmail] = useState('');

  const handleLoginSuccess = (userData) => {
    login(userData);
    setIsAuthOpen(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('landing');
  };

  const openAuthWithPrefill = (email) => {
    // Returning students skip the auth wall and land straight in the campus.
    if (isAuthenticated) {
      setCurrentView('dashboard');
      return;
    }
    setPrefillEmail(email || '');
    setIsAuthOpen(true);
  };

  // Plain "Acceso Alumnos" must not inherit a stale prefill from a prior test run
  const openAuth = () => {
    setPrefillEmail('');
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-brand-cyan/20 selection:text-brand-cyan">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAuthenticated={isAuthenticated}
        user={user}
        onOpenAuth={openAuth}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {currentView === 'landing' || !user ? (
          <LandingPage
            onOpenCalendly={() => setIsCalendlyOpen(true)}
            onOpenAuth={openAuth}
            onStartPlacementTest={() => setIsPlacementTestOpen(true)}
            onSelectCourse={(course) => {
              if (!isAuthenticated) {
                openAuth();
              } else {
                setCurrentView('dashboard');
              }
            }}
          />
        ) : (
          <StudentDashboard student={user} onOpenCalendly={() => setIsCalendlyOpen(true)} />
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
        prefillEmail={prefillEmail}
      />

      {/* Calendly Booking Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />

      {/* Interactive Placement Test: 3 questions → lead capture → result */}
      <PlacementTestModal
        isOpen={isPlacementTestOpen}
        onClose={() => setIsPlacementTestOpen(false)}
        onOpenAuth={openAuthWithPrefill}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
      />
    </div>
  );
}
