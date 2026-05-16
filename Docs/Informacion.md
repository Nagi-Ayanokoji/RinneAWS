1. Resumen del Proyecto
Nombre: Rin’ne

Funcionalidades:

Autenticación de usuarios (login/registro)

Subida de canciones desde archivos locales del usuario (sin límite de cantidad)

Reproductor de música (play/pause/volumen/cola)

Personalización de fondo y colores del HUD

Almacenamiento seguro en AWS S3

Base de datos PostgreSQL para metadatos

Restricciones: Ninguna. App 100% gratuita. Cada usuario puede subir todas las canciones que desee y escuchar sin límite de tiempo.

Entregable: Aplicación web full-stack desplegada en AWS

2. Stack Tecnológico (sin cambios, ya no mencionaba pagos)
Capa	Tecnología	Versión	Justificación
Frontend	React + TypeScript	18.3 / 5.6	Tipado fuerte, ecosistema maduro
Vite	5.4	Build extremadamente rápido
Zustand	4.5	State management ligero
Howler.js	2.2	Audio API confiable
TailwindCSS	3.4	Estilos utilitarios
Backend	Node.js	20.x LTS	E/S asíncrona eficiente
Express	4.19	Minimalista y probado
TypeScript	5.6	Mismo tipado en front/back
Passport.js + JWT	0.7 / 9.0	Autenticación robusta
Multer	1.4	Subida de archivos
fluent-ffmpeg	2.1	Procesamiento de audio
Base de Datos	PostgreSQL	15.x	ACID, confiable
Redis	7.2	Sesiones, caché, rate limiting
Infraestructura	Docker	27.x	Contenedores portables
AWS	-	Nube principal
3. Arquitectura en AWS (sin cambios estructurales)
text
Usuarios → CloudFront (CDN) → S3 (Frontend estático)
                           ↘ Application Load Balancer → ECS/Fargate (Backend Node.js)
                                                       ↘ RDS (PostgreSQL)
                                                       ↘ ElastiCache (Redis)
                                                       ↘ S3 (Canciones)
Servicios AWS utilizados:

Servicio	Propósito	Free Tier
S3	Frontend estático + almacenamiento de canciones	5GB gratis
CloudFront	CDN para contenido estático y canciones	1TB/mes gratis
ECS/Fargate	Ejecutar contenedor Docker del backend	No tiene free tier (usa EC2 t2.micro)
EC2 t2.micro	Alternativa económica para backend	750h/mes gratis
RDS	PostgreSQL	750h/mes db.t2.micro
ElastiCache	Redis (opcional, usa memoria local primero)	No tiene free tier
Nota sobre almacenamiento: Como no hay límite de canciones por usuario, el costo de S3 crecerá linealmente con el uso. Para un proyecto universitario con pocos usuarios, el free tier de 5GB es suficiente. Si se excede, el costo es ~$0.023 por GB adicional.