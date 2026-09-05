import { useEffect, useState } from 'react';

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** useState that mirrors to localStorage and follows changes from other tabs. */
export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => read(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked: keep in-memory state */
    }
  }, [key, value]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key) setValue(read(key, fallback));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}
