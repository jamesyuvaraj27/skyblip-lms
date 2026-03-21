import React, { useEffect, useMemo, useState } from 'react';
import { StudentPrefsContext } from './studentPrefsContextInstance.js';

const STORAGE_KEY = 'skyblip_student_prefs';

const defaultPrefs = {
  theme: 'midnight',
  readableMode: true,
  compactMode: false,
  fontScale: 100,
  defaultLanguage: 'javascript',
  autoRunTests: false,
  showLineNumbers: true,
  showCompilerHints: true
};

const normalizePrefs = (value) => {
  if (!value || typeof value !== 'object') return defaultPrefs;
  return {
    ...defaultPrefs,
    ...value,
    fontScale: Number(value.fontScale) || defaultPrefs.fontScale
  };
};

export const StudentPrefsProvider = ({ children }) => {
  const [prefs, setPrefs] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return normalizePrefs(raw ? JSON.parse(raw) : null);
    } catch {
      return defaultPrefs;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  useEffect(() => {
    document.body.setAttribute('data-student-theme', prefs.theme);
    document.body.classList.toggle('student-readable', Boolean(prefs.readableMode));
    document.body.classList.toggle('student-compact', Boolean(prefs.compactMode));
    document.documentElement.style.setProperty('--student-font-scale', `${prefs.fontScale}%`);

    return () => {
      document.body.removeAttribute('data-student-theme');
      document.body.classList.remove('student-readable');
      document.body.classList.remove('student-compact');
      document.documentElement.style.setProperty('--student-font-scale', '100%');
    };
  }, [prefs.compactMode, prefs.fontScale, prefs.readableMode, prefs.theme]);

  const updatePrefs = (patch) => {
    setPrefs((prev) => {
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      return normalizePrefs(next);
    });
  };

  const resetPrefs = () => setPrefs(defaultPrefs);

  const value = useMemo(
    () => ({
      prefs,
      updatePrefs,
      resetPrefs,
      themeOptions: [
        { value: 'midnight', label: 'Midnight Blue' },
        { value: 'light', label: 'Paper Light' },
        { value: 'forest', label: 'Forest Slate' }
      ]
    }),
    [prefs]
  );

  return <StudentPrefsContext.Provider value={value}>{children}</StudentPrefsContext.Provider>;
};
