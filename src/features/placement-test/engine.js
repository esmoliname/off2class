/**
 * Deterministic scoring engine for the placement test.
 * Pure functions only — no React, no side effects.
 */
import { QUESTIONS } from './questions';

const MAX_POINTS = QUESTIONS.reduce(
  (total, q) => total + Math.max(...q.options.map((o) => o.points)),
  0
);

// Percentage thresholds (answers yield 0/11/22/33/44/56/67/78/89/100 %)
const LEVEL_THRESHOLDS = [
  { min: 90, level: 'C1 (Usuario Avanzado)' },
  { min: 78, level: 'B2+ (Independiente Sólido)' },
  { min: 56, level: 'B2 (Usuario Independiente)' },
  { min: 44, level: 'B1+ (Umbral En Progreso)' },
  { min: 22, level: 'B1 (Umbral)' },
  { min: 0, level: 'A2 (Usuario Elemental)' },
];

const strengthTag = (ratio) =>
  ratio >= 0.67 ? 'Sólido' : ratio >= 0.34 ? 'En progreso' : 'Requiere refuerzo';

/**
 * @param {Record<string, string>} answers - { questionId: optionId }
 * @returns {{score: number, level: string, perSkill: Array, strengths: Array, gaps: Array}}
 */
export function scoreTest(answers) {
  const perSkill = QUESTIONS.map((q) => {
    const chosen = q.options.find((o) => o.id === answers[q.id]);
    const points = chosen ? chosen.points : 0;
    const max = Math.max(...q.options.map((o) => o.points));
    const ratio = max > 0 ? points / max : 0;
    return {
      key: q.skillKey,
      label: q.resultSkill,
      points,
      max,
      ratio,
      tag: strengthTag(ratio),
    };
  });

  const totalPoints = perSkill.reduce((sum, s) => sum + s.points, 0);
  const score = Math.round((totalPoints / MAX_POINTS) * 100);
  const level = LEVEL_THRESHOLDS.find((t) => score >= t.min).level;

  const ranked = [...perSkill].sort((a, b) => b.ratio - a.ratio);
  const strengths = ranked
    .filter((s) => s.ratio >= 0.34)
    .map((s) => ({ label: s.label, reason: `Fortaleza detectada: ${s.tag.toLowerCase()} en ${s.label}.` }));
  const gaps = [...ranked]
    .reverse()
    .filter((s) => s.ratio < 1)
    .map((s) => ({ label: s.label, reason: `Brecha a trabajar: ${s.tag.toLowerCase()} en ${s.label}.` }));

  return {
    score,
    level,
    perSkill,
    strengths: strengths.length ? strengths : [{ label: ranked[0].label, reason: 'Perfil equilibrado.' }],
    gaps: gaps.length ? gaps : [{ label: ranked[ranked.length - 1].label, reason: 'Sin brechas críticas detectadas.' }],
  };
}
