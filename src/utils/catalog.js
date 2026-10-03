/**
 * Course catalog data.
 * Every entry declares a `category` so CategoryFilter stays data-driven,
 * and an optional `brand` key resolved by ExamBadge (IELTS/TOEFL/... marks).
 */

/** Category filters for the catalog page */
export const CATALOG_FILTERS = [
  { id: 'all', label: 'Todo el catálogo' },
  { id: 'examen', label: 'Exámenes Internacionales' },
  { id: 'diagnostico', label: 'Diagnóstico IA' },
  { id: 'general', label: 'Inglés General' },
  { id: 'flexible', label: 'Modalidad Flexible' },
];

/** International exam preparation tracks (Vista 1) */
export const EXAM_COURSES = [
  {
    id: 'ielts-prep',
    title: 'Preparación IELTS',
    badge: 'IELTS Academic & General',
    badgeColor: 'blue',
    brand: 'ielts',
    category: 'examen',
    level: 'Objetivo Band 6.5 – 7.5',
    duration: '8 – 12 semanas',
    objective: '7.0+',
    description:
      'Entrenamiento integral de las cuatro macro habilidades con simulacros cronometrados y corrección docente de Writing y Speaking.',
    features: [
      'Simulacros oficiales con timing real por sección',
      'Corrección experta de Writing Task 1 y Task 2',
      'Speaking mock con examinador certificado',
      'Banco de 400+ reactivos y audios auténticos',
    ],
    ctaText: 'Ver Plan IELTS',
    iconName: 'Award',
    featured: false,
  },
  {
    id: 'toefl-prep',
    title: 'Preparación TOEFL iBT',
    badge: 'TOEFL iBT 100+',
    badgeColor: 'purple',
    brand: 'toefl',
    category: 'examen',
    level: 'Objetivo 90 – 110 pts',
    duration: '6 – 10 semanas',
    objective: '100+',
    description:
      'Preparación técnica para el formato integrado del TOEFL: lectura académica, speaking estructurado y ensayo independiente.',
    features: [
      'Estrategias por tipo de pregunta del iBT',
      'Grabación y análisis de respuestas de Speaking',
      'Template system para Independent Writing',
      'Reporte de progreso por sección semanal',
    ],
    ctaText: 'Ver Plan TOEFL',
    iconName: 'Cpu',
    featured: false,
  },
  {
    id: 'cambridge-prep',
    title: 'Cambridge B2 First / C1 Advanced',
    badge: 'Cambridge Qualifications',
    badgeColor: 'emerald',
    brand: 'cambridge',
    category: 'examen',
    level: 'Nivel B2 – C1 (CEFR)',
    duration: '10 – 14 semanas',
    objective: 'Grade A',
    description:
      'Ruta oficial hacia las certificaciones Cambridge con foco en Use of English, Reading y Speaking bajo criterios de examinador.',
    features: [
      'Preparación B2 First, C1 Advanced y C2 Proficiency',
      'Práctica intensiva de Use of English',
      'Simulacros con rúbricas oficiales de Cambridge',
      'Mentoría 1:1 para Speaking Part 2 y Part 3',
    ],
    ctaText: 'Ver Plan Cambridge',
    iconName: 'Award',
    featured: false,
  },
  {
    id: 'duolingo-prep',
    title: 'Duolingo English Test',
    badge: 'DET · Certificación Rápida',
    badgeColor: 'cyan',
    brand: 'duolingo',
    category: 'examen',
    level: 'Objetivo 110 – 130 pts',
    duration: '3 – 4 semanas',
    objective: '120+',
    description:
      'Preparación exprés para el examen adaptativo que se rende desde casa en una hora, con resultados en 48 horas.',
    features: [
      'Práctica con ítems adaptativos reales',
      'Entrenamiento de Writing Sample y Speaking Sample',
      'Estrategias anti-cheating y setup del examen',
      'Simulacro completo cronometrado de 60 minutos',
    ],
    ctaText: 'Ver Plan DET',
    iconName: 'Zap',
    featured: false,
  },
];

/** Landing-page academic programs */
export const COURSES_CATALOG = [
  {
    id: 'placement-test',
    title: 'Test de Ubicación Gratis',
    badge: 'Diagnóstico Inmediato',
    badgeColor: 'cyan',
    category: 'diagnostico',
    level: 'Todos los niveles (A1 - C2)',
    duration: '25 minutos',
    description:
      'Evaluación algorítmica completa de gramática, comprensión auditiva y vocabulario con retroalimentación instantánea.',
    features: [
      'Diagnóstico alineado al estándar CEFR / MCER',
      'Detección precisa de brechas de aprendizaje',
      'Plan de estudio personalizado con IA',
      'Certificado de nivel digital descargable',
    ],
    ctaText: 'Comenzar Test Gratis',
    iconName: 'Compass',
    featured: true,
  },
  {
    id: 'foundation',
    title: 'Clases desde Cero',
    badge: 'Principiantes & Fundamentos',
    badgeColor: 'emerald',
    category: 'general',
    level: 'Nivel A1 - A2',
    duration: '3 - 6 meses',
    description:
      'Metodología conversacional inmersiva paso a paso sin frustración, diseñada para adultos y profesionales sin base previa.',
    features: [
      'Profesores certificados nativos y bilingües',
      'Material interactivo Off2Class con audio real',
      'Grupos reducidos (máx. 6 estudiantes)',
      'Práctica de pronunciación asistida por IA',
    ],
    ctaText: 'Explorar Programa',
    iconName: 'Sparkles',
    featured: false,
  },
  {
    id: 'international-exams',
    title: 'Preparación de Exámenes Internacionales',
    badge: 'IELTS • TOEFL • Cambridge',
    badgeColor: 'purple',
    category: 'examen',
    level: 'Nivel B1 - C2',
    duration: '2 - 4 meses',
    description:
      'Entrenamiento intensivo y simulacros cronometrados para obtener los puntajes requeridos por universidades y visados.',
    features: [
      'Simulacros de examen reales con corrección experta',
      'Estrategias de Speaking y Writing bajo presión',
      'Banco de más de 400 reactivos y grabaciones',
      'Garantía de mejora en puntaje objetivo',
    ],
    ctaText: 'Ver Estrategia de Examen',
    iconName: 'Award',
    featured: false,
  },
  {
    id: 'hybrid-classes',
    title: 'Clases Grupales e Individuales',
    badge: 'Modalidad Flexible',
    badgeColor: 'blue',
    category: 'flexible',
    level: 'Personalizado',
    duration: 'Horarios a tu medida',
    description:
      'Elige entre la sinergia de dinámicas de grupo universitarias o la velocidad de sesiones 1 a 1 de alta exigencia.',
    features: [
      'Flexibilidad total de reprogramación',
      'Enfoque en inglés de negocios y técnico',
      'Grabaciones en la nube de cada sesión',
      'Sesiones sincrónicas + autoestudio supervisado',
    ],
    ctaText: 'Agendar Asesoría',
    iconName: 'Users',
    featured: false,
  },
];

/** Single source of truth for the catalog page (exam tracks + programs) */
export const CATALOG_COURSES = [...EXAM_COURSES, ...COURSES_CATALOG];
