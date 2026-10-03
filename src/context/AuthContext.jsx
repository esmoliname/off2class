import React, { createContext, useCallback, useMemo, useState } from 'react';

/**
 * Session persistence for the simulated auth (prototype scope).
 * Keeps the funnel alive across refreshes: leads and login survive reloads.
 */
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

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Hydrate from storage first; the stored session decides auth.
  const [user, setUser] = useState(() => readSession());

  const login = useCallback((userData) => {
    setUser(userData);
    writeSession(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
