import React, { createContext, useCallback, useMemo, useState } from 'react';
import { QUESTIONS } from '../utils/examQuestions';
import { scoreTest } from '../utils/examEngine';
import { saveLead } from '../utils/leads';
import { track } from '../utils/track';

/**
 * Placement test state machine.
 * Stages: intro -> questions (indexed) -> capture (lead form) -> result
 */
export const ExamContext = createContext(null);

const EMPTY_ANSWERS = {};

export function ExamProvider({ children }) {
  const [stage, setStage] = useState('intro');
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', whatsapp: '' });
  const [result, setResult] = useState(null);
  const [capturedLead, setCapturedLead] = useState(null);

  const reset = useCallback(() => {
    setStage('intro');
    setActiveIndex(0);
    setAnswers(EMPTY_ANSWERS);
    setLeadForm({ name: '', email: '', whatsapp: '' });
    setResult(null);
    setCapturedLead(null);
  }, []);

  const start = useCallback(() => {
    setStage('questions');
    setActiveIndex(0);
  }, []);

  const answeredCount = useMemo(
    () => QUESTIONS.filter((q) => answers[q.id]).length,
    [answers]
  );

  /** Sections for the sidebar: completed / active / pending */
  const sections = useMemo(
    () =>
      QUESTIONS.map((q, index) => ({
        ...q,
        index,
        answered: Boolean(answers[q.id]),
        chosen: answers[q.id] || null,
        state:
          stage === 'questions' && index === activeIndex
            ? 'active'
            : answers[q.id]
            ? 'completed'
            : 'pending',
      })),
    [answers, activeIndex, stage]
  );

  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const selectOption = useCallback(
    (questionId, optionId) => {
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
      track('exam_answer', { questionId, optionId });
    },
    []
  );

  /** Jump to any section already reached (answered or is the active one) */
  const goToSection = useCallback(
    (index) => {
      if (stage !== 'questions') return;
      const maxReached = Math.min(answeredCount, QUESTIONS.length - 1);
      if (index <= maxReached) setActiveIndex(index);
    },
    [stage, answeredCount]
  );

  const next = useCallback(() => {
    const current = QUESTIONS[activeIndex];
    if (!answers[current.id]) return;
    if (activeIndex < QUESTIONS.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setResult(scoreTest(answers));
      setStage('capture');
      track('exam_completed', { answered: answeredCount + 1 });
    }
  }, [activeIndex, answers, answeredCount]);

  const back = useCallback(() => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  }, [activeIndex]);

  const setLeadField = useCallback((field, value) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const submitLead = useCallback(() => {
    const lead = saveLead({
      name: leadForm.name.trim(),
      email: leadForm.email.trim(),
      whatsapp: leadForm.whatsapp.trim(),
      testResult: result
        ? { level: result.level, score: result.score, perSkill: result.perSkill }
        : null,
      source: 'placement-test-portal',
    });
    setCapturedLead(lead);
    setStage('result');
    track('lead_captured', { source: 'placement-test-portal' });
  }, [leadForm, result]);

  const value = useMemo(
    () => ({
      stage,
      activeIndex,
      questions: QUESTIONS,
      currentQuestion: QUESTIONS[activeIndex],
      answers,
      sections,
      answeredCount,
      progress,
      result,
      leadForm,
      capturedLead,
      start,
      reset,
      selectOption,
      goToSection,
      next,
      back,
      setLeadField,
      submitLead,
    }),
    [
      stage,
      activeIndex,
      answers,
      sections,
      answeredCount,
      progress,
      result,
      leadForm,
      capturedLead,
      start,
      reset,
      selectOption,
      goToSection,
      next,
      back,
      setLeadField,
      submitLead,
    ]
  );

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}
