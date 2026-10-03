import React, { useCallback, useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthModal from './components/overlays/AuthModal';
import CalendlyModal from './components/overlays/CalendlyModal';
import LandingPage from './pages/LandingPage';
import CourseCatalogPage from './pages/CourseCatalogPage';
import ExamPortal from './pages/ExamPortal';
import Classroom from './pages/Classroom';
import StudentDashboard from './pages/StudentDashboard';

import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { ExamProvider } from './context/ExamContext';
import { useAuth } from './hooks/useAuth';
import { VIEWS } from './utils/constants';

export default function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <ExamProvider>
          <AppShell />
        </ExamProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

function AppShell() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // Views are hash-addressable (#catalog, #exam, #classroom, #dashboard)
  // so every screen is deep-linkable and shareable.
  const viewFromHash = () => {
    const hash = window.location.hash.replace('#', '').trim();
    return Object.values(VIEWS).includes(hash) ? hash : VIEWS.LANDING;
  };

  const [currentView, setCurrentView] = useState(viewFromHash);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState('');

  useEffect(() => {
    const onHashChange = () => {
      setCurrentView(viewFromHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((view) => {
    if (window.location.hash.replace('#', '') !== view) {
      window.location.hash = view; // hashchange updates the view
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  // Guard: an unauthenticated user can never sit on the private campus.
  useEffect(() => {
    if (!isAuthenticated && currentView === VIEWS.DASHBOARD) {
      navigate(VIEWS.LANDING);
    }
  }, [isAuthenticated, currentView, navigate]);

  const handleLoginSuccess = (userData) => {
    login(userData);
    setIsAuthOpen(false);
    navigate(VIEWS.DASHBOARD);
  };

  const handleLogout = () => {
    logout();
    navigate(VIEWS.LANDING);
  };

  /** Returning students skip the auth wall and land straight in the campus. */
  const openAuthWithPrefill = (email) => {
    if (isAuthenticated) {
      navigate(VIEWS.DASHBOARD);
      return;
    }
    setPrefillEmail(email || '');
    setIsAuthOpen(true);
  };

  /** Plain "Acceso Alumnos" must not inherit a stale prefill from a prior test run. */
  const openAuth = () => {
    setPrefillEmail('');
    setIsAuthOpen(true);
  };

  const openCalendly = () => setIsCalendlyOpen(true);

  const handleSelectCourse = (course) => {
    if (course.id === 'placement-test') {
      navigate(VIEWS.EXAM);
    } else if (course.id === 'hybrid-classes') {
      openCalendly();
    } else if (!isAuthenticated) {
      openAuth();
    } else {
      navigate(VIEWS.DASHBOARD);
    }
  };

  const startPlacementTest = () => navigate(VIEWS.EXAM);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-brand-cyan/20 selection:text-brand-cyan">
      <Navbar
        currentView={currentView}
        onNavigate={navigate}
        isAuthenticated={isAuthenticated}
        user={user}
        onOpenAuth={openAuth}
        onOpenCalendly={openCalendly}
        onLogout={handleLogout}
      />

      <div className="flex-1">
        {currentView === VIEWS.CATALOG && (
          <CourseCatalogPage
            onNavigate={navigate}
            onSelectCourse={handleSelectCourse}
            onOpenCalendly={openCalendly}
            onStartPlacementTest={startPlacementTest}
          />
        )}

        {currentView === VIEWS.EXAM && (
          <ExamPortal
            onNavigate={navigate}
            onOpenAuth={openAuthWithPrefill}
            onOpenCalendly={openCalendly}
          />
        )}

        {currentView === VIEWS.CLASSROOM && (
          <Classroom onNavigate={navigate} student={user} />
        )}

        {currentView === VIEWS.DASHBOARD && isAuthenticated && (
          <StudentDashboard student={user} onOpenCalendly={openCalendly} onNavigate={navigate} />
        )}

        {(currentView === VIEWS.LANDING ||
          (currentView === VIEWS.DASHBOARD && !isAuthenticated)) && (
          <LandingPage
            onOpenCalendly={openCalendly}
            onOpenAuth={openAuth}
            onStartPlacementTest={startPlacementTest}
            onSelectCourse={handleSelectCourse}
            onNavigate={navigate}
          />
        )}
      </div>

      <Footer onOpenCalendly={openCalendly} onNavigate={navigate} />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        prefillEmail={prefillEmail}
      />

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </div>
  );
}
