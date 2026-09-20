# Off2Class University Suite | Prototipo Liquid Glass & Whitelabel Bridge

Prototipo web funcional de alta fidelidad construido con **React (Vite)** y **Tailwind CSS**, inspirado en el lenguaje visual de **Apple Ecosystem (VisionOS / macOS Sonoma / Liquid Glass)**. 

Integra una Landing Page comercial de conversión académica, un Dashboard de estudiante potenciado con Inteligencia Artificial diagnóstica, el puente de redirección directo a **Off2Class Whitelabel**, y el módulo comunitario **Verneval**.

---

## 🎨 Principios de Diseño: Apple Liquid Glass

1. **Profundidad y Translucidez:** Uso intensivo de fondos oscuros profundos (`#07090e`), paneles de cristal líquido con desenfoque de fondo (`backdrop-blur-xl bg-[#0e131f]/60`).
2. **Reflejos Especulares (Specular Highlights):** Micro-bordes superiores con degradados lineales hiperfinos que imitan la física de refracción de luz sobre vidrio pulido.
3. **Iluminación Ambiental:** Orbes radiales difusos (Cyan `#00F0FF`, Violeta `#9D4EDD` y Azul `#0071E3`) que proporcionan calidez y volumen visual.
4. **Tipografía de Alta Legibilidad:** Integración tipográfica moderna con *Plus Jakarta Sans* y jerarquía visual estricta para métricas académicas.

---

## 🧱 Arquitectura y Estructura Modular

```text
off2class/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx        # Modal de autenticación con acceso rápido demo
│   │   ├── CalendlyModal.jsx    # Selector de citas y enlace directo a Calendly
│   │   ├── CourseCatalog.jsx    # Catálogo interactivo de 4 programas formativos
│   │   ├── Footer.jsx           # Pie de página minimalista Apple
│   │   ├── Hero.jsx             # Sección principal con CTAs de alto impacto
│   │   └── Navbar.jsx           # Barra de navegación flotante con estado de sesión
│   ├── pages/
│   │   ├── LandingPage.jsx      # Vista pública comercial y valor pedagógico
│   │   └── StudentDashboard.jsx # Panel universitario con IA y puente Off2Class
│   ├── utils/
│   │   └── constants.js         # Configuración whitelabel, cursos, métricas y mock data
│   ├── App.jsx                  # Coordinador de estado global y test de ubicación
│   ├── index.css                # Sistema de diseño Liquid Glass y directivas Tailwind
│   └── main.jsx                 # Punto de entrada de la aplicación
├── index.html                   # Documento base con meta tags SEO
├── package.json                 # Dependencias y scripts
├── tailwind.config.js           # Tokens de diseño y animaciones personalizadas
└── vite.config.js               # Configuración de compilación Vite
```

---

## 🚀 Módulos y Funcionalidades Principales

### 1. Landing Page Comercial
- **Hero Section:** Llamadas a la acción (CTA) claras hacia el *Test de Ubicación Gratis* y *Agendamiento de Asesoría*.
- **Catálogo de Cursos:**
  - *Clases desde Cero (A1 - A2)*: Fundamentos y enfoque conversacional sin frustración.
  - *Test de Ubicación Gratis*: Evaluación CEFR en 25 minutos con diagnóstico algorítmico inmediato.
  - *Preparación de Exámenes Internacionales*: Entrenamiento para IELTS, TOEFL y Cambridge.
  - *Clases Grupales e Individuales*: Modalidad flexible a medida con profesores certificados.
- **Test de Ubicación Interactivo:** Flujo interactivo integrado de 3 reactivos CEFR que asigna automáticamente el nivel y muestra recomendaciones inmediatas.
- **Integración Calendly:** Modal con selector de horarios y enlace directo a la agenda académica.

### 2. Dashboard del Estudiante (Campus con IA)
- **Puente Redirección Off2Class Whitelabel (Destacado):**
  - Tarjeta de bienvenida principal con botón iluminado: **"Acceder a mi Aula Virtual / Off2Class"**.
  - Redirige sin fricción al subdominio externo configurado en `src/utils/constants.js`.
- **Recomendador de Lecciones con IA:**
  - Diagnóstico adaptativo que analiza debilidades específicas (Grammar, Speaking, Listening).
  - Botón *Lanzar Lección* con código de lección Off2Class asociado.
- **Métricas de Rendimiento:**
  - Tasa de completitud del curso, horas totales, racha diaria (*Streak*) y radar por habilidad CEFR.
- **Módulo de Comunidad / Chat ("Verneval"):**
  - Canales temáticos: `#general-campus`, `#speaking-drills`, `#grammar-qa` y `#exam-prep`.
  - Envío de mensajes en tiempo real con simulación de respuesta automática pedagógica.

---

## ⚙️ Configuración del Subdominio Whitelabel

Para conectar el puente a tu propio subdominio de Off2Class (por ejemplo, `campus.tuacademia.com` o `tucolegio.off2class.com`), editá el archivo `src/utils/constants.js`:

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
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🔒 Licencia y Créditos
Desarrollado para el ecosistema educativo de **Off2Class**. Prototipo con arquitectura limpia y componentes reutilizables.
