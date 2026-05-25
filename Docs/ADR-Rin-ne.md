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
| ADR-011 | Seguridad y Gestión de Paquetes | ✅ Aceptado |

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
Usar **PostgreSQL 15** para datos relacionales y **Redis 7.2** para caché y revocación de tokens. 
*Nota de Arquitectura Cloud:* Para alinearse con las restricciones de costo de la capa gratuita, **se difiere el uso de AWS ElastiCache** en producción académica. En su lugar, Redis se ejecuta como un contenedor Docker local dentro de la misma instancia EC2 o se utiliza caché en memoria RAM en Node.js, eliminando cualquier costo de infraestructura adicional mientras se mantiene la compatibilidad de API.

### Justificación
- PostgreSQL ofrece ACID completo, ideal para metadatos de canciones y relaciones usuario-canción.
- Soporte nativo para JSONB permite almacenar configuraciones de HUD flexibles sin migraciones frecuentes.
- Redis elimina consultas repetidas a PostgreSQL para datos de sesión y lista negra de JWTs.
- **Análisis de Costos:** AWS ElastiCache (`cache.t3.micro`) no cuenta con capa gratuita y cuesta ~$12 USD/mes. Diferir este servicio y correr Redis localmente en Docker dentro de EC2 reduce este costo a **$0 USD**.

### Consecuencias
- ✅ Consistencia garantizada para operaciones críticas sin incurrir en costos.
- ✅ Redis acelera autenticación y reduce carga en la base de datos PostgreSQL.
- ⚠️ Ejecutar Redis en la misma instancia EC2 consume parte de la memoria RAM disponible (1GB en t2.micro), lo cual se mitiga limitando la memoria máxima de Redis a 128MB.
- ❌ AWS ElastiCache queda diferido para futuras fases de escalabilidad masiva comercial.

### Análisis Comparativo de Costes Reales (Base de Datos)
| Opción Evaluada | Costo en Desarrollo (Free Tier) | Costo Mensual Proyectado (Post-Free Tier / Producción) |
|---|---|---|
| PostgreSQL (Local Docker en EC2) | $0 USD | $0 USD (Compartido con EC2) |
| PostgreSQL (AWS RDS db.t3.micro) | $0 USD (750 h/mes) | ~$15 USD/mes |
| Redis (Docker local en EC2) | $0 USD | $0 USD (Compartido con EC2) |
| Redis (AWS ElastiCache) | No aplica (Sin Free Tier) | ~$12 USD/mes |

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
- ⚠️ Sin límite de canciones por usuario, el costo puede crecer sin control en producción real si no se aplican cuotas por usuario.
- ❌ Latencia de primera conexión mayor que almacenamiento local.

### Análisis Comparativo de Costes Reales (Almacenamiento)
| Servicio Evaluado | Costo en Desarrollo (Free Tier) | Costo Proyectado (50GB de canciones) | Costo Proyectado (500GB de canciones) |
|---|---|---|---|
| Almacenamiento Local (EC2 EBS 8GB) | $0 USD (Incluido en Free Tier) | No aplica (Límite físico de disco) | No aplica (Límite físico de disco) |
| Amazon S3 Standard Storage | $0 USD (Hasta 5GB) | ~$1.15 USD/mes ($0.023/GB) | ~$11.50 USD/mes ($0.023/GB) |
| Amazon S3 One Zone-IA (Infrequent) | No aplica (Sin Free Tier) | ~$0.50 USD/mes ($0.010/GB) | ~$5.00 USD/mes ($0.010/GB) |

---

## ADR-008 — Infraestructura: AWS (EC2 t2.micro + RDS)

**Fecha:** 2025-01  
**Estado:** Aceptado

### Contexto
El proyecto es universitario con presupuesto mínimo. Se requiere despliegue en nube real (no local). La aplicación no tiene requerimientos de alta disponibilidad críticos en esta fase.

### Decisión
Desplegar el backend en **EC2 t2.micro** (free tier) en lugar de ECS/Fargate, y usar **RDS db.t3.micro** para PostgreSQL.
*Nota de Consistencia:* En concordancia con la arquitectura real implementada y los costes evaluados, **se elimina ElastiCache (Redis) administrado de AWS** de la infraestructura final de despliegue. Redis se ejecuta en un contenedor local o se maneja en caché interna, evitando un cargo no cubierto por la capa gratuita.

### Justificación
- EC2 t2.micro: 750 horas/mes gratuitas durante 12 meses (suficiente para desarrollo y demos).
- RDS db.t3.micro: 750 horas/mes gratuitas (free tier PostgreSQL).
- Docker se ejecuta sobre EC2 t2.micro para mantener portabilidad.
- CloudFront + S3 para el frontend estático (sin costo significativo).

### Arquitectura Desplegada Real (Producción Académica)
```
Internet
  └── CloudFront (CDN)
        ├── S3 (Frontend React build)
        └── EC2 t2.micro (Backend Node.js + Docker)
              ├── RDS PostgreSQL (db.t3.micro) (Base de Datos Relacional)
              └── S3 (Almacenamiento de Canciones y portadas)
```

### Consecuencias
- ✅ Costo de $0 USD durante el año de Free Tier.
- ✅ Experiencia real con servicios Core de AWS (EC2, RDS, S3, IAM, CloudWatch).
- ⚠️ La instancia t2.micro (1 vCPU, 1 GB RAM) puede saturarse ante subidas masivas concurrentes. Se limita a subidas síncronas controladas.
- ❌ Sin auto-scaling ni balanceo de carga en esta fase; suficiente para el alcance académico.

### Análisis Comparativo de Costes Reales (Cómputo e Infraestructura)
| Componente Evaluado | Opción Free Tier | Opción Comercial / Producción | Costo Mensual Proyectado |
|---|---|---|---|
| Servidor Web / API | EC2 t2.micro (750 h/mes gratis) | EC2 t3.small (2 vCPU, 2GB RAM) | ~$15.00 USD/mes |
| Base de Datos Relacional | RDS db.t3.micro (750 h/mes gratis) | RDS db.t3.medium (Multi-AZ) | ~$35.00 USD/mes |
| Balanceador de Carga | Nginx local en EC2 ($0 USD) | AWS ALB (Application Load Balancer) | ~$22.00 USD/mes |
| Certificado SSL | Let's Encrypt / Certbot ($0 USD) | AWS ACM ($0 USD, requiere ALB) | $0 USD |

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

## ADR-011 — Seguridad y Gestión de Paquetes

**Fecha:** 2026-05  
**Estado:** Aceptado

### Contexto
Se ha realizado una revisión de seguridad exhaustiva del stack tecnológico debido a vulnerabilidades reportadas en el ecosistema Node.js y problemas críticos con gestores de paquetes. Es imperativo establecer líneas base de versiones y prácticas de seguridad.

### Decisión
1. **Gestor de Paquetes:** Uso estricto de **pnpm**. Queda estrictamente prohibido usar `npm` debido a vulnerabilidades recientes ("hackeado").
2. **Subida de Archivos:** Usar **Multer v2.1.0 o superior** para mitigar vulnerabilidades de DoS (CVE‑2026‑2359 y CVE‑2026‑3304).
3. **Autenticación:** 
   - Usar **Passport v0.6.0 o superior**.
   - Usar **jsonwebtoken v9.0.0 o superior**, validando siempre estrictamente los algoritmos y llaves en `jwt.verify` y rotando los secrets (no incrustados).
4. **Procesamiento de Audio:** Sanitizar rigurosamente todos los inputs de usuario antes de pasarlos a `fluent-ffmpeg` para prevenir inyección de comandos.
5. **Entorno de Desarrollo:** No exponer nunca el servidor de desarrollo de Vite en producción.

### Justificación
- La seguridad en el manejo de archivos de audio es crítica dado que se permite la subida ilimitada desde los clientes.
- La gestión de JWT sin validación de algoritmos es una puerta de entrada común para vulnerabilidades críticas.
- `pnpm` garantiza instalaciones seguras y aislamientos eficientes en un momento de inestabilidad en `npm`.

### Consecuencias
- ✅ Mitigación directa de vulnerabilidades conocidas (DoS, Command Injection).
- ✅ Mayor estabilidad en la gestión de dependencias con pnpm.
- ⚠️ Requiere estricta revisión de código en la validación de JWT y en la construcción de comandos para ffmpeg.

---

## C4 Nivel 4 — Vista de Código (Arquitectura de Software)

### Arquitectura de Capas del Backend (Express + TS)

El backend de Rin'ne adopta el patrón arquitectónico de **Separación de Concernimientos (SoC)** y **Capas desacopladas** para garantizar escalabilidad, facilidad de pruebas e independencia del motor de base de datos.

```
src/
├── config/         # Configuraciones globales (base de datos, pasaportes, S3)
├── controllers/    # Controladores: Orquestación de peticiones y respuestas HTTP
├── routes/         # Enrutadores: Definición de rutas y mapeo de middlewares
├── middleware/     # Interceptores: Autenticación, validación de schemas y archivos
├── services/       # Servicios de negocio: Lógica de procesamiento (FFmpeg, uploads)
├── database/       # Consultas y queries crudos a PostgreSQL
├── utils/          # Utilidades comunes y helpers
└── app.ts          # Inicializador de la aplicación Express
```

#### Flujo de Ejecución (Nivel Código)
```
Cliente HTTP ──> Route (endpoint) ──> Auth Middleware (JWT) ──> Controller ──> Service (FFmpeg/S3) ──> Database (Query) ──> Client (JSON)
```

1. **Rutas (`routes/`):** Definen los endpoints expuestos (ej. `POST /api/songs/upload`). Aplican filtros middleware de Passport JWT para verificar autenticidad.
2. **Controladores (`controllers/`):** Capturan el payload del request, delegan la lógica de negocio al servicio correspondiente, y formatean la respuesta HTTP (ej. `res.status(201).json(...)`).
3. **Servicios (`services/`):** Contienen la lógica algorítmica pesada, como interactuar con el SDK de AWS o ejecutar procesos hijos de FFmpeg para extraer metadatos.
4. **Base de Datos (`database/`):** Encapsula todas las sentencias SQL parametrizadas a PostgreSQL utilizando la librería de conexión `pg` o query builders.

---

### Arquitectura del Frontend (React + Zustand)

El frontend sigue un flujo de datos **unidireccional y reactivo** estructurado en componentes modulares y tiendas globales reactivas.

```
src/
├── api/            # Cliente Axios configurado con interceptores de JWT
├── assets/         # Recursos estáticos (imágenes, logos, SVGs)
├── components/     # Componentes visuales y de HUD (Player, Sidebar, UploadModal)
├── pages/          # Vistas de página principales (LoginPage, DashboardPage)
├── stores/         # Stores de Zustand (authStore, playerStore, preferencesStore)
├── index.css       # Estilos globales y variables CSS dinámicas del HUD
└── main.tsx        # Punto de entrada de la aplicación React
```

#### Gestión del Estado Reactivo (Zustand Stores)
* **`authStore.ts`:** Almacena el token JWT del usuario actual, el estado de sesión (`isAuthenticated`), y maneja llamadas de registro, login y logout.
* **`playerStore.ts`:** Orquesta la instancia global de **Howler.js**, controlando la cola activa de reproducción, pista en ejecución, volumen, progreso actual y estados de playback (playing, paused).
* **`preferencesStore.ts`:** Administra las CSS Variables globales (`--hud-color`, `--bg-image`) persistidas para el HUD en tiempo de ejecución, sincronizándolas con la base de datos al realizar cambios en vivo.

---
