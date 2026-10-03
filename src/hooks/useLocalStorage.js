import { useCallback, useState } from 'react';

/** localStorage-backed state hook (storage failures degrade to in-memory). */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch (e) {
          console.warn('[useLocalStorage] could not persist:', e);
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, set];
}
