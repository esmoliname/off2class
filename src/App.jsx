import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AuthModal from './components/AuthModal';
import CalendlyModal from './components/CalendlyModal';
import Footer from './components/Footer';
import PlacementTestModal from './features/placement-test/PlacementTestModal';
import { MOCK_STUDENT } from './utils/constants';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for rich initial demo
  const [user, setUser] = useState(MOCK_STUDENT);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isPlacementTestOpen, setIsPlacementTestOpen] = useState(false);
  // Email captured by the placement test, pre-filled into AuthModal
  const [prefillEmail, setPrefillEmail] = useState('');

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

  const openAuthWithPrefill = (email) => {
    if (email) setPrefillEmail(email);
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
