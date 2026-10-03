import { useContext } from 'react';
import { ExamContext } from '../context/ExamContext';

export function useExam() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error('useExam must be used inside <ExamProvider>');
  return ctx;
}
