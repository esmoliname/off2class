/**
 * Application Constants & Configuration
 * Off2Class Platform & Whitelabel Bridge
 */

// External Whitelabel Redirection URL (Customizable to your actual school/university subdomain)
export const OFF2CLASS_WHITELABEL_URL = "https://app.off2class.com";
export const CALENDLY_BOOKING_URL = "https://calendly.com";

// Course Catalog Data
export const COURSES_CATALOG = [
  {
    id: "placement-test",
    title: "Test de Ubicación Gratis",
    badge: "Diagnóstico Inmediato",
    badgeColor: "cyan",
    level: "Todos los niveles (A1 - C2)",
    duration: "25 minutos",
    description: "Evaluación algorítmica completa de gramática, comprensión auditiva y vocabulario con retroalimentación instantánea.",
    features: [
      "Diagnóstico alineado al estándar CEFR / MCER",
      "Detección precisa de brechas de aprendizaje",
      "Plan de estudio personalizado con IA",
      "Certificado de nivel digital descargable"
    ],
    ctaText: "Comenzar Test Gratis",
    iconName: "Compass",
    featured: true
  },
  {
    id: "foundation",
    title: "Clases desde Cero",
    badge: "Principiantes & Fundamentos",
    badgeColor: "emerald",
    level: "Nivel A1 - A2",
    duration: "3 - 6 meses",
    description: "Metodología conversacional inmersiva paso a paso sin frustración, diseñada para adultos y profesionales sin base previa.",
    features: [
      "Profesores certificados nativos y bilingües",
      "Material interactivo Off2Class con audio real",
      "Grupos reducidos (máx. 6 estudiantes)",
      "Práctica de pronunciación asistida por IA"
    ],
    ctaText: "Explorar Programa",
    iconName: "Sparkles",
    featured: false
  },
  {
    id: "international-exams",
    title: "Preparación de Exámenes Internacionales",
    badge: "IELTS • TOEFL • Cambridge",
    badgeColor: "purple",
    level: "Nivel B1 - C2",
    duration: "2 - 4 meses",
    description: "Entrenamiento intensivo y simulacros cronometrados para obtener los puntajes requeridos por universidades y visados.",
    features: [
      "Simulacros de examen reales con corrección experta",
      "Estrategias de Speaking y Writing bajo presión",
      "Banco de más de 400 reactivos y grabaciones",
      "Garantía de mejora en puntaje objetivo"
    ],
    ctaText: "Ver Estrategia de Examen",
    iconName: "Award",
    featured: false
  },
  {
    id: "hybrid-classes",
    title: "Clases Grupales e Individuales",
    badge: "Modalidad Flexible",
    badgeColor: "blue",
    level: "Personalizado",
    duration: "Horarios a tu medida",
    description: "Elige entre la sinergia de dinámicas de grupo universitarias o la velocidad de sesiones 1 a 1 de alta exigencia.",
    features: [
      "Flexibilidad total de reprogramación",
      "Enfoque en inglés de negocios y técnico",
      "Grabaciones en la nube de cada sesión",
      "Sesiones sincrónicas + autoestudio supervisado"
    ],
    ctaText: "Agendar Asesoría",
    iconName: "Users",
    featured: false
  }
];

// Mock Student Data
export const MOCK_STUDENT = {
  id: "std-98214",
  name: "Sofía Valenzuela",
  email: "sofia.valenzuela@alumnos.edu",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  currentLevel: "B2.1 (Intermedio Alto)",
  targetLevel: "C1 (Avanzado Operativo)",
  program: "Inglés Universitario & Business Communication",
  streakDays: 14,
  completionRate: 68,
  stats: {
    hoursLogged: 42.5,
    lessonsCompleted: 38,
    assessmentsPassed: 6,
    avgAccuracy: "89%"
  },
  cefrBreakdown: [
    { skill: "Speaking & Pronunciation", score: 78, level: "B1+" },
    { skill: "Listening Comprehension", score: 88, level: "B2" },
    { skill: "Grammar & Syntax", score: 72, level: "B1+" },
    { skill: "Reading & Vocabulary", score: 94, level: "C1" },
  ]
};

// AI Recommendations for Student
export const AI_RECOMMENDATIONS = [
  {
    id: "rec-1",
    title: "Dominio de Tiempos Verbales: Past Perfect Continuous",
    skill: "Grammar",
    reason: "Detectamos vacíos en la última prueba diagnóstica en oraciones condicionales mixtas.",
    difficulty: "B2.2",
    estimatedTime: "20 min",
    confidenceBoost: "+6% Grammar",
    isOff2ClassLesson: true,
    off2classLessonCode: "G-B2-104"
  },
  {
    id: "rec-2",
    title: "Speaking Lab: Reducciones y Connected Speech",
    skill: "Pronunciation",
    reason: "Optimiza tu ritmo y entonación en reuniones académicas internacionales.",
    difficulty: "B2",
    estimatedTime: "15 min",
    confidenceBoost: "+10% Fluency",
    isOff2ClassLesson: true,
    off2classLessonCode: "S-B2-022"
  },
  {
    id: "rec-3",
    title: "Simulador de Entrevista de Trabajo en Tech",
    skill: "Business English",
    reason: "Alineado a tu meta declarada de pasantía internacional.",
    difficulty: "B2+",
    estimatedTime: "30 min",
    confidenceBoost: "+12% Interview Readiness",
    isOff2ClassLesson: false
  }
];

// Verneval Community Channels & Initial Messages
export const VERNEVAL_CHANNELS = [
  { id: "general", name: "general-campus", label: "Campus General", icon: "Globe" },
  { id: "pronunciation", name: "speaking-drills", label: "Laboratorio de Pronunciación", icon: "Mic" },
  { id: "grammar-qa", name: "grammar-qa", label: "Consultas Gramaticales", icon: "HelpCircle" },
  { id: "ielts-toefl", name: "exam-prep", label: "Comunidad IELTS & TOEFL", icon: "BookOpen" }
];

export const INITIAL_VERNEVAL_MESSAGES = [
  {
    id: "msg-1",
    channel: "general",
    sender: "Prof. David Miller",
    role: "Lead Mentor (Off2Class)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    content: "¡Bienvenidos al ciclo intensivo! Recuerden que las tareas de la unidad 4 en Off2Class se cierran este viernes a las 23:59. Si tienen dudas con el 'Third Conditional', dejen su consulta en #grammar-qa.",
    timestamp: "Hoy, 10:15 AM",
    likes: 7
  },
  {
    id: "msg-2",
    channel: "general",
    sender: "Carlos Mendoza",
    role: "Estudiante B2",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    content: "Acabo de terminar el Placement Test y me asignaron a B2.1. ¿Alguien para practicar Speaking por audio hoy a la tarde?",
    timestamp: "Hoy, 11:30 AM",
    likes: 3
  },
  {
    id: "msg-3",
    channel: "pronunciation",
    sender: "Verneval AI Assistant",
    role: "Bot Evaluador",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200",
    content: "💡 Reto del día de pronunciación: Diferencia entre 'Ship' /ʃɪp/ y 'Sheep' /ʃiːp/. Graba tu nota de voz para recibir un score de fonética instantáneo.",
    timestamp: "Hoy, 09:00 AM",
    likes: 12
  }
];
