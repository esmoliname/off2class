/**
 * Mock data (prototype scope): student, AI recommendations,
 * community channels and the live classroom room.
 */

export const MOCK_STUDENT = {
  id: 'std-98214',
  name: 'Sofía Valenzuela',
  email: 'sofia.valenzuela@alumnos.edu',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  currentLevel: 'B2.1 (Intermedio Alto)',
  targetLevel: 'C1 (Avanzado Operativo)',
  program: 'Inglés Universitario & Business Communication',
  streakDays: 14,
  completionRate: 68,
  stats: {
    hoursLogged: 42.5,
    lessonsCompleted: 38,
    assessmentsPassed: 6,
    avgAccuracy: '89%',
  },
  cefrBreakdown: [
    { skill: 'Speaking & Pronunciation', score: 78, level: 'B1+' },
    { skill: 'Listening Comprehension', score: 88, level: 'B2' },
    { skill: 'Grammar & Syntax', score: 72, level: 'B1+' },
    { skill: 'Reading & Vocabulary', score: 94, level: 'C1' },
  ],
};

export const AI_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'Dominio de Tiempos Verbales: Past Perfect Continuous',
    skill: 'Grammar',
    reason: 'Detectamos vacíos en la última prueba diagnóstica en oraciones condicionales mixtas.',
    difficulty: 'B2.2',
    estimatedTime: '20 min',
    confidenceBoost: '+6% Grammar',
    isOff2ClassLesson: true,
    off2classLessonCode: 'G-B2-104',
  },
  {
    id: 'rec-2',
    title: 'Speaking Lab: Reducciones y Connected Speech',
    skill: 'Pronunciation',
    reason: 'Optimiza tu ritmo y entonación en reuniones académicas internacionales.',
    difficulty: 'B2',
    estimatedTime: '15 min',
    confidenceBoost: '+10% Fluency',
    isOff2ClassLesson: true,
    off2classLessonCode: 'S-B2-022',
  },
  {
    id: 'rec-3',
    title: 'Simulador de Entrevista de Trabajo en Tech',
    skill: 'Business English',
    reason: 'Alineado a tu meta declarada de pasantía internacional.',
    difficulty: 'B2+',
    estimatedTime: '30 min',
    confidenceBoost: '+12% Interview Readiness',
    isOff2ClassLesson: false,
  },
];

export const VERNEVAL_CHANNELS = [
  { id: 'general', name: 'general-campus', label: 'Campus General', icon: 'Globe' },
  { id: 'pronunciation', name: 'speaking-drills', label: 'Laboratorio de Pronunciación', icon: 'Mic' },
  { id: 'grammar-qa', name: 'grammar-qa', label: 'Consultas Gramaticales', icon: 'HelpCircle' },
  { id: 'ielts-toefl', name: 'exam-prep', label: 'Comunidad IELTS & TOEFL', icon: 'BookOpen' },
];

export const INITIAL_VERNEVAL_MESSAGES = [
  {
    id: 'msg-1',
    channel: 'general',
    sender: 'Prof. David Miller',
    role: 'Lead Mentor (Globaltest English)',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    content:
      "¡Bienvenidos al ciclo intensivo! Recuerden que las tareas de la unidad 4 en Off2Class se cierran este viernes a las 23:59. Si tienen dudas con el 'Third Conditional', dejen su consulta en #grammar-qa.",
    timestamp: 'Hoy, 10:15 AM',
    likes: 7,
  },
  {
    id: 'msg-2',
    channel: 'general',
    sender: 'Carlos Mendoza',
    role: 'Estudiante B2',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    content:
      'Acabo de terminar el Placement Test y me asignaron a B2.1. ¿Alguien para practicar Speaking por audio hoy a la tarde?',
    timestamp: 'Hoy, 11:30 AM',
    likes: 3,
  },
  {
    id: 'msg-3',
    channel: 'pronunciation',
    sender: 'Verneval AI Assistant',
    role: 'Bot Evaluador',
    avatar:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    content:
      "💡 Reto del día de pronunciación: Diferencia entre 'Ship' /ʃɪp/ y 'Sheep' /ʃiːp/. Graba tu nota de voz para recibir un score de fonética instantáneo.",
    timestamp: 'Hoy, 09:00 AM',
    likes: 12,
  },
];

/* ------------------------------------------------------------------ */
/* Live classroom (Vista 3)                                            */
/* ------------------------------------------------------------------ */

export const CLASSROOM_LESSON = {
  id: 'live-9182',
  title: 'Unit 12 · Phrasal Verbs in Academic Writing',
  level: 'B2.1',
  teacher: {
    name: 'Prof. David Miller',
    role: 'Lead Mentor · Globaltest English',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    speaking: true,
  },
  startedAtLabel: '00:38:12',
  off2classLessonCode: 'U12-B2-018',
  participants: [
    { id: 'p1', name: 'Sofía Valenzuela', level: 'B2.1', avatar: MOCK_STUDENT.avatarUrl, speaking: false, you: true },
    {
      id: 'p2',
      name: 'Carlos Mendoza',
      level: 'B2.1',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      speaking: true,
    },
    {
      id: 'p3',
      name: 'Lucía Ferrer',
      level: 'B2.2',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      speaking: false,
    },
    {
      id: 'p4',
      name: 'Mateo Duarte',
      level: 'B1+',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      speaking: false,
    },
  ],
};

export const CLASSROOM_CHAT = [
  {
    id: 'c1',
    sender: 'Prof. David Miller',
    role: 'Profesor',
    avatar: CLASSROOM_LESSON.teacher.avatar,
    content: 'Chicos, abramos la pizarra: hoy desarmamos los phrasal verbs más usados en papers.',
    time: '10:04',
    self: false,
  },
  {
    id: 'c2',
    sender: 'Lucía Ferrer',
    role: 'Estudiante',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    content: '¿"Put down" en contexto académico es "anotar" o "menospreciar"?',
    time: '10:06',
    self: false,
  },
  {
    id: 'c3',
    sender: 'Prof. David Miller',
    role: 'Profesor',
    avatar: CLASSROOM_LESSON.teacher.avatar,
    content: 'Buena pregunta, Lucía. En métodos normalmente es "registran": "the study put down the sample size".',
    time: '10:07',
    self: false,
  },
];

/** Handwritten strokes rendered on the virtual board (SVG path data) */
export const BOARD_STROKES = [
  'M40 50 C 120 58, 210 44, 300 52',
  'M40 108 c 18 -7, 36 7, 54 0 s 36 -7, 54 0 s 36 7, 54 0',
  'M310 158 l 0 16 M302 166 l 16 0 M305 161 l 10 10 M315 161 l -10 10',
  'M40 208 c 20 -6, 44 6, 66 0 s 44 -6, 66 0',
];

export const BOARD_NOTES = [
  { label: 'Phrasal Verb', value: 'put down → register / belittle', tone: 'cyan' },
  { label: 'Collocation', value: 'carry out an experiment', tone: 'purple' },
  { label: 'Academic', value: 'the findings point out that…', tone: 'emerald' },
];
