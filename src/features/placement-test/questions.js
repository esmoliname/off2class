/**
 * Placement test question bank.
 * Each question targets one CEFR skill; each option carries points
 * so scoring is deterministic (never hardcoded).
 */
export const QUESTIONS = [
  {
    id: 'q1',
    skillKey: 'grammar',
    skillLabel: 'Gramática Aplicada',
    resultSkill: 'Grammar & Syntax',
    prompt:
      '"If the university board _______ earlier, we would have adjusted our academic syllabus."',
    options: [
      { id: 'q1a', text: 'notified', points: 0 },
      { id: 'q1b', text: 'had notified', points: 3 },
      { id: 'q1c', text: 'would notify', points: 1 },
      { id: 'q1d', text: 'has notified', points: 0 },
    ],
  },
  {
    id: 'q2',
    skillKey: 'vocabulary',
    skillLabel: 'Vocabulario y Registro Formal',
    resultSkill: 'Reading & Vocabulary',
    prompt:
      'Which term best fits a high-level academic paper: "The research findings strongly _______ the initial hypothesis."',
    options: [
      { id: 'q2a', text: 'corroborate', points: 3 },
      { id: 'q2b', text: 'back up somewhat', points: 1 },
      { id: 'q2c', text: 'give a thumbs up to', points: 0 },
      { id: 'q2d', text: 'stand for', points: 0 },
    ],
  },
  {
    id: 'q3',
    skillKey: 'listening',
    skillLabel: 'Listening & Inference',
    resultSkill: 'Listening Comprehension',
    prompt:
      'Speaker A: "I thought the lecture was rather convoluted." — What does Speaker A mean?',
    options: [
      { id: 'q3a', text: 'The lecture was straightforward and clear.', points: 0 },
      { id: 'q3b', text: 'The lecture was overly complicated and difficult to follow.', points: 3 },
      { id: 'q3c', text: 'The lecture ended earlier than expected.', points: 0 },
      { id: 'q3d', text: 'The speaker disagreed with the conclusions.', points: 1 },
    ],
  },
];
