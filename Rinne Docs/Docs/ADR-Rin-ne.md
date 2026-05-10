# ADR — Rin'ne: Decisiones de Arquitectura

> **Proyecto:** Rin'ne — Plataforma de streaming de música personal  
> **Versión:** 1.0  
> **Estado:** Activo  

---

## Índice de ADRs

| ID | Título | Estado |
|----|--------|--------|
| ADR-001 | Stack Frontend: React + TypeScript + Vite | ✅ Aceptado |
| ADR-002 | State Management: Zustand | ✅ Aceptado |
| ADR-003 | Reproducción de Audio: Howler.js | ✅ Aceptado |
| ADR-004 | Backend: Node.js + Express + TypeScript | ✅ Aceptado |
| ADR-005 | Autenticación: Passport.js + JWT | ✅ Aceptado |
| ADR-006 | Base de Datos: PostgreSQL + Redis | ✅ Aceptado |
| ADR-007 | Almacenamiento de Archivos: AWS S3 | ✅ Aceptado |
| ADR-008 | Infraestructura: AWS (ECS/Fargate o EC2 + RDS) | ✅ Aceptado |
| ADR-009 | Procesamiento de Audio: fluent-ffmpeg | ✅ Aceptado |
| ADR-010 | Estilos: TailwindCSS | ✅ Aceptado |

---

## ADR-001 — Stack Frontend: React + TypeScript + Vite

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
Se necesita una SPA (Single Page Application) con UI reactiva, reproducción de audio en tiempo real y personalización visual (fondos, colores de HUD). El proyecto es académico, por lo que la curva de aprendizaje y la documentación importan.

### Decisión
Usar **React 18.3** con **TypeScript 5.6** como framework principal, empaquetado con **Vite 5.4**.

### Justificación
- React tiene el ecosistema más maduro para SPAs con manipulación de estado complejo.
- TypeScript aporta tipado estático que reduce errores en tiempo de desarrollo, especialmente para las interfaces de datos de canciones y configuración de usuario.
- Vite ofrece HMR (Hot Module Replacement) casi instantáneo, acelerando el ciclo de desarrollo.

### Consecuencias
- ✅ Tipado fuerte en toda la app, compartido con el backend.
- ✅ Build rápido y dev server ágil.
- ⚠️ Ligera curva inicial si el equipo no conoce TypeScript.
- ❌ SSR no incluido nativamente (no requerido para este proyecto).

### Alternativas descartadas
| Alternativa | Razón de descarte |
|-------------|-------------------|
| Vue 3 | Menor ecosistema de librerías de audio |
| Next.js | SSR innecesario; complejidad extra para proyecto universitario |
| Svelte | Ecosistema más pequeño, menor documentación |

---

## ADR-002 — State Management: Zustand

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
La app necesita manejar estado global: cola de reproducción, canción activa, configuración de HUD, sesión de usuario. El estado debe ser accesible desde múltiples componentes sin prop drilling.

### Decisión
Usar **Zustand 4.5** como gestor de estado global.

### Justificación
- API mínima y sin boilerplate (comparado con Redux Toolkit).
- No requiere Provider wrapper sobre toda la app.
- Ideal para estado de reproductor de música donde múltiples componentes leen/escriben simultáneamente.
- Soporta middleware para persistencia local (configuración de HUD).

### Consecuencias
- ✅ Código más limpio y menos archivos de configuración.
- ✅ Devtools compatibles con Redux DevTools.
- ⚠️ Menos convenciones que Redux; el equipo debe acordar estructura de stores.

### Alternativas descartadas
| Alternativa | Razón de descarte |
|-------------|-------------------|
| Redux Toolkit | Excesivo para la escala del proyecto |
| React Context + useReducer | Performance insuficiente para actualizaciones frecuentes del reproductor |
| Jotai | Menos documentación, menor adopción |

---

## ADR-003 — Reproducción de Audio: Howler.js

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
El reproductor necesita: play/pause, control de volumen, cola de reproducción, scrubbing de posición, y streaming de archivos desde S3 (URLs presignadas). Debe funcionar en todos los navegadores modernos.

### Decisión
Usar **Howler.js 2.2** como librería de audio.

### Justificación
- Abstrae las diferencias entre Web Audio API y HTML5 Audio con fallback automático.
- Soporta streaming desde URLs (S3 presignadas) sin necesidad de descargar el archivo completo.
- API simple: `new Howl({ src: [...] })` con eventos `play`, `pause`, `end`, `seek`.
- Soporte para múltiples formatos: MP3, FLAC, OGG, WAV.

### Consecuencias
- ✅ Cross-browser sin configuración extra.
- ✅ Permite streaming y control de posición.
- ⚠️ No incluye visualizador de onda de audio (requeriría Web Audio API adicional).
- ❌ Bundle de ~34KB adicionales.

### Alternativas descartadas
| Alternativa | Razón de descarte |
|-------------|-------------------|
| HTML5 `<audio>` nativo | Menos control sobre streaming y eventos |
| Tone.js | Overkill; enfocado en síntesis musical, no reproducción |

---

## ADR-004 — Backend: Node.js + Express + TypeScript

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
El backend debe manejar: autenticación, upload de archivos de audio (potencialmente grandes), generación de URLs presignadas de S3, y consultas a PostgreSQL. Debe ser asíncrono y eficiente en I/O.

### Decisión
Usar **Node.js 20 LTS** con **Express 4.19** y **TypeScript 5.6**.

### Justificación
- Node.js es ideal para I/O intensivo (uploads, streaming) por su event loop no bloqueante.
- Express es minimalista, bien documentado y con amplio ecosistema de middleware.
- TypeScript compartido con el frontend elimina duplicación de interfaces (DTOs).
- LTS garantiza soporte hasta 2026+.

### Consecuencias
- ✅ Mismo lenguaje en front y back (un solo equipo puede manejar todo).
- ✅ Tipos compartidos para reducir errores de integración.
- ⚠️ Express no incluye validación de esquemas; requiere librería adicional (Zod o Joi).
- ❌ No recomendado para procesamiento CPU-intensivo (delegado a ffmpeg como proceso hijo).

### Alternativas descartadas
| Alternativa | Razón de descarte |
|-------------|-------------------|
| Fastify | Menor familiaridad del equipo |
| NestJS | Excesivamente estructurado para proyecto universitario |
| Python/FastAPI | Rompe la uniformidad TypeScript del stack |

---

## ADR-005 — Autenticación: Passport.js + JWT

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
La app requiere autenticación de usuarios con registro, login y sesiones persistentes. Las rutas de upload, listado de canciones y configuración de HUD deben estar protegidas.

### Decisión
Usar **Passport.js 0.7** con estrategia **JWT (jsonwebtoken 9.0)** para autenticación stateless.

### Justificación
- JWT permite autenticación stateless: el backend no necesita consultar base de datos en cada request (el token lleva la identidad).
- Passport.js es el estándar de facto para autenticación en Express, con estrategias bien testeadas.
- Compatible con el modelo SPA donde el frontend almacena el token en memoria o cookies httpOnly.

### Consecuencias
- ✅ Escalable: funciona sin sesiones en servidor.
- ✅ Compatible con múltiples clientes (web, futuro móvil).
- ⚠️ Revocación de tokens requiere una lista negra en Redis (para logout inmediato).
- ⚠️ Tokens deben tener expiración corta (15-60 min) con refresh tokens.

### Alternativas descartadas
| Alternativa | Razón de descarte |
|-------------|-------------------|
| Sesiones con express-session | Stateful; requiere Redis obligatorio desde el inicio |
| Auth0 / Clerk | Dependencia de servicio externo; costo potencial |
| Firebase Auth | Acoplamiento a ecosistema Google |

---

## ADR-006 — Base de Datos: PostgreSQL + Redis

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
El sistema necesita almacenar: usuarios, metadatos de canciones (título, artista, duración, ruta S3, portada), configuración de HUD por usuario, y lista de tokens revocados. Se requiere consistencia transaccional para los metadatos.

### Decisión
Usar **PostgreSQL 15** para datos relacionales y **Redis 7.2** para caché y revocación de tokens. Redis es opcional en fase inicial (se puede usar memoria local).

### Justificación
- PostgreSQL ofrece ACID completo, ideal para metadatos de canciones y relaciones usuario-canción.
- Soporte nativo para JSONB permite almacenar configuraciones de HUD flexibles sin migraciones frecuentes.
- Redis elimina consultas repetidas a PostgreSQL para datos de sesión y lista negra de JWTs.
- AWS RDS y ElastiCache ofrecen gestión administrada de ambas tecnologías.

### Consecuencias
- ✅ Consistencia garantizada para operaciones críticas.
- ✅ Redis acelera autenticación y reduce carga en RDS.
- ⚠️ Dos servicios de base de datos incrementan complejidad operacional.
- ⚠️ ElastiCache no tiene free tier; se puede iniciar sin Redis.

### Esquema inicial (PostgreSQL)
```sql
-- Usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Canciones
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  album VARCHAR(255),
  duration_seconds INTEGER,
  s3_key VARCHAR(500) NOT NULL,
  cover_s3_key VARCHAR(500),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configuración HUD
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  background_type VARCHAR(50) DEFAULT 'solid',
  background_value VARCHAR(255) DEFAULT '#1a1a2e',
  hud_color VARCHAR(7) DEFAULT '#e94560',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## ADR-007 — Almacenamiento de Archivos: AWS S3

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
Los usuarios pueden subir canciones sin límite de cantidad. Los archivos de audio (MP3, FLAC, etc.) pueden pesar entre 3-50 MB cada uno. Se necesita almacenamiento duradero, escalable y de bajo costo.

### Decisión
Usar **AWS S3** para almacenamiento de canciones y portadas. El backend genera **URLs presignadas** para que el frontend suba y reproduzca directamente desde S3.

### Justificación
- S3 tiene durabilidad de 99.999999999% (11 nueves).
- Las URLs presignadas permiten que el frontend suba/lea directamente sin pasar por el backend, reduciendo latencia y costo de transferencia.
- CloudFront como CDN delante de S3 reduce latencia de reproducción globalmente.
- Free tier: 5 GB gratuitos (suficiente para proyecto universitario).

### Estructura de paths en S3
```
rinne/
├── users/{user_id}/
│   ├── songs/{song_id}.mp3
│   └── covers/{song_id}.jpg
└── frontend/ (assets estáticos)
```

### Consecuencias
- ✅ Escalabilidad ilimitada sin gestión de disco.
- ✅ Costo proporcional al uso ($0.023/GB después del free tier).
- ⚠️ Sin límite de canciones por usuario, el costo puede crecer sin control en producción real.
- ❌ Latencia de primera conexión mayor que almacenamiento local.

---

## ADR-008 — Infraestructura: AWS (EC2 t2.micro + RDS)

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
El proyecto es universitario con presupuesto mínimo. Se requiere despliegue en nube real (no local). La aplicación no tiene requerimientos de alta disponibilidad críticos en esta fase.

### Decisión
Desplegar el backend en **EC2 t2.micro** (free tier) en lugar de ECS/Fargate, y usar **RDS db.t2.micro** para PostgreSQL.

### Justificación
- EC2 t2.micro: 750 horas/mes gratuitas durante 12 meses (suficiente para desarrollo y demos).
- RDS db.t2.micro: 750 horas/mes gratuitas (free tier PostgreSQL).
- Docker se ejecuta sobre EC2 t2.micro para mantener portabilidad.
- CloudFront + S3 para el frontend estático (sin costo significativo).

### Arquitectura desplegada
```
Internet
  └── CloudFront (CDN)
        ├── S3 (Frontend React build)
        └── EC2 t2.micro (Backend Node.js + Docker)
              ├── RDS PostgreSQL (db.t2.micro)
              ├── ElastiCache Redis (opcional / diferido)
              └── S3 (Canciones y portadas)
```

### Consecuencias
- ✅ Costo ~$0 durante el año de free tier.
- ✅ Experiencia real con AWS sin costo inicial.
- ⚠️ t2.micro (1 vCPU, 1 GB RAM) puede saturarse con uploads concurrentes.
- ❌ Sin auto-scaling en esta fase; suficiente para demos universitarias.

---

## ADR-009 — Procesamiento de Audio: fluent-ffmpeg

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
Al subir canciones, el sistema debe extraer metadatos (duración, bitrate, sample rate) y opcionalmente normalizar el volumen o transcodificar formatos exóticos a MP3.

### Decisión
Usar **fluent-ffmpeg 2.1** como wrapper de FFmpeg en el backend Node.js.

### Justificación
- FFmpeg es el estándar de la industria para procesamiento de audio/video.
- fluent-ffmpeg provee una API fluida y Promise-based compatible con async/await.
- Permite extraer metadatos sin almacenar el archivo completo en memoria.
- Transcodificación como proceso hijo no bloquea el event loop de Node.js.

### Consecuencias
- ✅ Soporte para MP3, FLAC, OGG, WAV, AAC y más.
- ✅ Extracción de metadatos automática.
- ⚠️ FFmpeg debe instalarse en el contenedor Docker (agrega ~80 MB al imagen).
- ⚠️ Transcodificación en t2.micro puede ser lenta para archivos grandes.

---

## ADR-010 — Estilos: TailwindCSS

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
El proyecto requiere personalización visual del HUD (colores, fondos) por parte del usuario. El sistema de estilos debe ser flexible y eficiente.

### Decisión
Usar **TailwindCSS 3.4** como framework de estilos utilitarios, complementado con CSS variables para los colores dinámicos del HUD.

### Justificación
- Tailwind permite construir UI rápidamente sin escribir CSS custom extenso.
- Las CSS variables (`--hud-color`, `--bg-color`) permiten cambiar colores del HUD en runtime sin recompilar Tailwind.
- Integración nativa con Vite y PostCSS.
- PurgeCSS integrado elimina clases no usadas en build de producción.

### Consecuencias
- ✅ Consistencia visual rápida de implementar.
- ✅ Personalización de HUD via CSS variables sin overhead.
- ⚠️ Clases HTML pueden volverse verbose con muchas utilidades.
- ❌ Curva de aprendizaje si el equipo prefiere CSS tradicional.

---

*Documento generado para el proyecto universitario Rin'ne — Plataforma de música personal.*
