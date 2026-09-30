/**
 * Session persistence for the simulated auth (prototype scope).
 * Keeps the funnel alive across refreshes: leads and login survive reloads.
 */
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'verneval.session';

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('[session] could not persist session:', e);
  }
}

export function useSession() {
  // Hydrate from storage first; the stored session (not a hardcoded flag) decides auth.
  const [user, setUser] = useState(() => readSession());

  const login = useCallback((userData) => {
    setUser(userData);
    writeSession(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeSession(null);
  }, []);

  return {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  };
}
