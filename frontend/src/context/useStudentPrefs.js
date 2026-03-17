import { useContext } from 'react';
import { StudentPrefsContext } from './studentPrefsContextInstance.js';

export const useStudentPrefs = () => {
  const ctx = useContext(StudentPrefsContext);
  if (!ctx) {
    throw new Error('useStudentPrefs must be used within StudentPrefsProvider');
  }
  return ctx;
};
