# Off2Class University Suite | Prototipo Liquid Glass & Whitelabel Bridge

Prototipo web funcional de alta fidelidad construido con **React (Vite)** y **Tailwind CSS**, inspirado en el lenguaje visual de **Apple Ecosystem (VisionOS / macOS Sonoma / Liquid Glass)**.

Integra una Landing Page comercial de conversión académica, un Catálogo de preparación de exámenes, un Portal de Placement Test, una Sala de Clase en vivo y un Dashboard de estudiante con IA diagnóstica, más el puente de redirección directo a **Off2Class Whitelabel** y el módulo comunitario **Verneval**.

---

## 🎨 Principios de Diseño: Apple Liquid Glass

1. **Profundidad y Translucidez:** Fondos oscuros profundos (`#07090e` / `#0d1117`) y paneles de cristal líquido con `backdrop-blur` (clases `.liquid-glass*`, `.dock-glass`, `.panel-biolum`).
2. **Reflejos Especulares:** Micro-bordes con degradados hiperfinos (`.specular-border`) que imitan la refracción de luz sobre vidrio pulido.
3. **Iluminación Ambiental:** Orbes radiales difusos (Cyan `#00F0FF`, Violeta `#9D4EDD`, Esmeralda `#10B981`) que aportan volumen y jerarquía.
4. **Tipografía de Alta Legibilidad:** *Inter* para UI, *Outfit* (`fontFamily.display`) para display y *JetBrains Mono* para métricas/código. Se respeta `prefers-reduced-motion`.

---

## 🧱 Arquitectura y Estructura Modular

```text
off2class/
├── public/
├── src/
│   ├── assets/
│   │   └── brands/              # Marcas de exámenes (IELTS, TOEFL, Cambridge, Duolingo)
│   ├── components/
│   │   ├── ui/                  # Design system: Button, Card, Badge, ProgressBar, Input, Modal
│   │   ├── layout/              # Navbar, Footer, PageContainer, AmbientGlow
│   │   ├── sections/            # Secciones de la landing (Hero, etc.)
│   │   ├── overlays/            # AuthModal, CalendlyModal (sobre ui/Modal)
│   │   ├── shared/              # BridgeCTA hacia Off2Class Whitelabel
│   │   ├── catalog/             # ExamBadge, CategoryFilter, CourseCard, CourseCatalog
│   │   ├── exam/                # QuestionCard, OptionSelector, LeadCaptureForm, ExamResult, etc.
│   │   └── classroom/           # VideoFeed, VirtualBoard, ClassChat, ControlDock, LessonSidebar
│   ├── context/                 # AuthContext, CourseContext, ExamContext (estado global)
│   ├── hooks/                   # useAuth, useExam, useCourse, useLocalStorage
│   ├── pages/                   # LandingPage, CourseCatalogPage, ExamPortal, Classroom, StudentDashboard
│   ├── styles/index.css         # Sistema de diseño Liquid Glass + directivas Tailwind
│   ├── utils/                   # constants, catalog, mocks, examQuestions, examEngine, leads, track, cn
│   ├── App.jsx                  # Providers + shell con router por hash (#catalog, #exam, #classroom…)
│   └── main.jsx                 # Punto de entrada
├── index.html                   # Documento base con meta tags SEO y fuentes
├── package.json                 # Dependencias y scripts
├── tailwind.config.js           # Tokens de diseño (paleta, tipografía display) y animaciones
└── vite.config.js               # Configuración de compilación Vite
```

Decisiones de arquitectura:

- **Router sin dependencias:** la vista activa vive en `App.jsx` (`VIEWS` en `utils/constants.js`) y se sincroniza con el hash del navegador, así cada vista es deep-linkable (`/#catalog`, `/#exam`, `/#classroom`).
- **Estado global con Context:** auth (`AuthContext`), curso/sección (`CourseContext`) y máquina de estados del examen (`ExamContext`: intro → questions → capture → result).
- **Datos y mocks aislados:** catálogo en `utils/catalog.js`, mocks de UI en `utils/mocks.js`, motor del test en `utils/examEngine.js`.

---

## 🚀 Módulos y Funcionalidades Principales

### 1. Landing Page Comercial
- Hero con CTAs hacia el *Test de Ubicación Gratis* y *Agendar Asesoría*.
- Catálogo destacado, métricas y funnel completo hacia el dashboard.

### 2. Catálogo de Preparación (`/#catalog`)
- Filtros por categoría (Exámenes Internacionales, Diagnóstico IA, Inglés General, Modalidad Flexible).
- 8 programas con badges de marca (IELTS, TOEFL, Cambridge, Duolingo), duración, puntaje objetivo y features por card.

### 3. Portal de Placement Test (`/#exam`)
- Test CEFR de 3 preguntas / 3 habilidades, con barra de progreso, sidebar de secciones y navegación entre preguntas.
- Captura de lead (`utils/leads.js`, localStorage) → AuthModal con prefill → resultado con nivel y recomendación.

### 4. Sala de Clase en Vivo (`/#classroom`)
- Video feed con doctor overlays, pizarra virtual SVG, chat funcional y dock de controles (mic/cámara/pantalla/mano/chat/salir).
- Sidebar de lección con materiales y timer real de la sesión.

### 5. Dashboard del Estudiante (Campus con IA)
- **Puente Off2Class Whitelabel:** botón iluminado *Acceder a mi Aula Virtual* vía `BridgeCTA` → `OFF2CLASS_WHITELABEL_URL`.
- Recomendador de lecciones con IA, métricas de rendimiento y comunidad Verneval (canales + chat simulado).

---

## ⚙️ Configuración del Subdominio Whitelabel

Para conectar el puente a tu propio subdominio de Off2Class (por ejemplo, `campus.tuacademia.com` o `tucolegio.off2class.com`), editá `src/utils/constants.js`:

```javascript
// src/utils/constants.js
export const OFF2CLASS_WHITELABEL_URL = "https://app.off2class.com"; // Modificar por tu URL personalizada
export const CALENDLY_BOOKING_URL = "https://calendly.com";         // Modificar por tu link de Calendly
```

---

## 🛠️ Instalación y Ejecución Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar y previsualizar producción:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🔒 Licencia y Créditos
Desarrollado para el ecosistema educativo de **Off2Class**. Prototipo con arquitectura limpia y componentes reutilizables.
