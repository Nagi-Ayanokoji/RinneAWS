# Informe de Proyecto de Aula: Plataforma Rin'ne

**Formato Institucional Adaptado (FO-IV-159)**  
**Proyecto:** Rin'ne — Plataforma de Streaming de Música Personal y HUD Personalizable  
**Curso:** Proyectos de Aula / Ingeniería de Software  
**Fecha:** Mayo 2026  
**Versión:** 2.0  

---

## 1. Resumen

El proyecto Rin'ne consiste en el diseño, desarrollo e implementación de una aplicación web full-stack dedicada al streaming de música de carácter personal. Su propósito fundamental es ofrecer a los usuarios un espacio privado y centralizado en la nube para alojar y reproducir su colección de audio digital, otorgándoles el control absoluto sobre su contenido sin las restricciones de almacenamiento, costos mensuales o intermediación de las plataformas de streaming comerciales actuales. 

La arquitectura tecnológica implementada se basa en una SPA (Single Page Application) desarrollada en el frontend mediante **React**, **TypeScript** y **Vite**, gestionada en su estado global por **Zustand** y con reproducción interactiva utilizando **Howler.js**. El backend está construido en **Node.js** con **Express**, gestionando la persistencia de metadatos en una base de datos relacional **PostgreSQL** y sirviendo archivos de audio locales y portadas con capacidades de streaming mediante solicitudes de rango HTTP (*HTTP range requests*). La solución completa se encuentra dockerizada e implementada en la infraestructura cloud de **Amazon Web Services (AWS)** a través de una instancia **EC2** gestionada con **PM2** y **Nginx** como servidor web y proxy inverso.

---

## 2. Planteamiento del Problema y Pregunta de Investigación

### Planteamiento del Problema
En la actualidad, las plataformas comerciales de streaming de música (como Spotify, Apple Music o Deezer) dominan el mercado de la distribución de audio. No obstante, este modelo presenta importantes limitaciones para un segmento específico de usuarios:
1. **Pérdida de propiedad del contenido:** Los usuarios están sujetos a cambios unilaterales en los catálogos de música debido a disputas de licenciamiento y derechos de autor, lo que a menudo resulta en la desaparición de álbumes o canciones de sus bibliotecas personales.
2. **Falta de personalización estética:** Las interfaces de usuario de estas plataformas son sumamente rígidas, no permitiendo adaptar la identidad visual (HUD, paleta de colores, fondos de pantalla) a los gustos individuales.
3. **Costo acumulativo y restrictivo:** Escuchar música sin anuncios publicitarios o con funciones básicas (como saltar canciones ilimitadamente) está condicionado al pago de suscripciones mensuales recurrentes.
4. **Gestión ineficiente de colecciones locales:** Aquellos melómanos que poseen archivos de audio digital especializados (como grabaciones independientes, conciertos en vivo o formatos de alta fidelidad) carecen de una plataforma ágil para transmitirlos de manera privada a través de múltiples dispositivos sin depender de complejas sincronizaciones locales.

### Pregunta de Investigación / Definición del Problema
Ante esta situación, se formula la siguiente pregunta orientadora:
> ¿Cómo diseñar y desarrollar una plataforma web de streaming de música personal, que sea escalable, segura y altamente personalizable visualmente, haciendo uso de tecnologías full-stack modernas y un modelo de infraestructura cloud optimizado de bajo costo?

---

## 3. Justificación

El desarrollo de Rin'ne se justifica desde una perspectiva técnica y social:
* **Perspectiva Técnica:** Permite integrar conceptos avanzados de desarrollo de software moderno como arquitecturas desacopladas, desarrollo orientado al rendimiento en el lado del cliente (con Vite y Zustand), procesamiento asíncrono y manipulación de streams binarios en el servidor (Node.js/Express con Multer), y despliegue robusto utilizando contenedores virtuales (Docker) y servidores web industriales (Nginx y PM2).
* **Perspectiva de Negocio/Usuario:** El proyecto empodera al usuario final al devolverle el control absoluto sobre sus archivos digitales de música. A través de la infraestructura en la nube de AWS, el usuario puede acceder a su biblioteca personal desde cualquier lugar y en cualquier momento, de forma 100% gratuita dentro del esquema del *Free Tier*, experimentando además con un nivel de personalización de la interfaz (fondos y colores de HUD) que no ofrece ninguna alternativa comercial del mercado.

---

## 4. Objetivos del Proyecto

### Objetivo General
Diseñar e implementar una plataforma web de streaming de música personal (Rin'ne) con arquitectura full-stack y despliegue en la nube de AWS, que permita a los usuarios almacenar, gestionar y reproducir de manera privada sus archivos de audio, proporcionando capacidades de personalización visual persistentes para la interfaz de usuario.

### Objetivos Específicos (Medibles y Verificables)
1. **Desarrollar una interfaz de usuario fluida e interactiva** mediante React, TypeScript y Zustand que logre un tiempo de respuesta de renderizado inicial (First Contentful Paint) menor a 1.8 segundos bajo conexiones de red de banda ancha estándar.
2. **Implementar un sistema de subida y procesamiento de archivos de audio** con Node.js y Multer que soporte la carga simultánea de hasta 20 archivos en formatos estándar (MP3, WAV, OGG, FLAC) con límites físicos de 50MB por canción, realizando la extracción automática de metadatos (título, artista, álbum, duración) en un tiempo promedio inferior a 3 segundos por pista.
3. **Modelar y desplegar una base de datos relacional PostgreSQL** normalizada en Tercera Forma Normal (3FN), conteniendo al menos 8 entidades con cardinalidades y restricciones de integridad referencial explícitas para resguardar los metadatos y preferencias de usuario sin inconsistencias.
4. **Configurar el entorno cloud de AWS** utilizando una instancia EC2 t2.micro, Docker, y un proxy inverso Nginx con políticas de firewall restringidas en Security Groups, garantizando una disponibilidad operativa del 99.5% durante el periodo de evaluación y pruebas académicas del sistema.
5. **Validar la calidad del software** mediante el diseño y ejecución de un plan de pruebas basado en 13 historias de usuario estructuradas bajo la metodología ágil, logrando una tasa de aprobación del 100% en los criterios de aceptación prioritarios (*Must Have*) definidos con sintaxis Gherkin.

---

## 5. Alcance y Exclusiones

### Alcance del Proyecto
El sistema Rin'ne comprende las siguientes funcionalidades operativas:
* **Módulo de Usuarios:** Registro seguro, inicio de sesión basado en JSON Web Tokens (JWT) y cierre de sesión con revocación de tokens.
* **Módulo de Biblioteca:** Subida de música individual o múltiple, edición de títulos y portadas de canciones, filtrado en tiempo real por búsqueda y eliminación lógica/física de registros y archivos del almacenamiento.
* **Módulo de Reproductor:** Controles completos de reproducción de audio (reproducir, pausar, volumen, silenciar, barra de progreso interactiva con arrastre temporal) y control de la cola dinámica de reproducción (siguiente, anterior, inserción ordenada).
* **Módulo de Personalización:** Modificación interactiva del color de acento del HUD mediante selector de color (*color picker*), carga y aplicación de imágenes o colores sólidos de fondo de pantalla, y configuración dinámica de partículas de fondo (nieve, lluvia, líneas, puntos), con persistencia de preferencias en base de datos.
* **Módulo de Infraestructura:** Contenerización de servicios, proxy inverso Nginx sirviendo el frontend de forma estática y redirigiendo las llamadas de API al proceso backend administrado por PM2, y configuración de bases de datos PostgreSQL sobre volumen persistente.

### Exclusiones del Proyecto
Quedan explícitamente fuera del alcance de este proyecto de aula las siguientes características:
* Desarrollo de aplicaciones nativas para dispositivos móviles (iOS / Android).
* Algoritmos de recomendación inteligente de música basados en aprendizaje automático o inteligencia artificial.
* Integración de pasarelas de pago o modelos de suscripción de cobro recurrente.
* Funciones de red social como listas de reproducción compartidas de forma pública, mensajería interna o perfiles de usuario públicos.
* Conversión o transcodificación forzada de formatos de compresión sin pérdida de alta gama (como DSD o ALAC de ultra alta resolución) que comprometan la CPU del servidor gratuito de AWS.

---

## 6. Actores del Sistema

Para el correcto modelamiento de los flujos de trabajo de Rin'ne, se identifican dos actores principales:

| Actor | Descripción | Permisos y Atribuciones en la App |
|---|---|---|
| **Usuario Final** | Persona natural autenticada dueña de la biblioteca musical y de la personalización de la interfaz. | - Registrarse e iniciar sesión de forma segura.<br>- Subir y eliminar canciones y portadas de su propiedad.<br>- Crear, editar y borrar playlists.<br>- Reproducir canciones e interactuar con la cola.<br>- Configurar y guardar sus preferencias estéticas del HUD. |
| **Administrador del Sistema (Docente/Evaluador)** | Usuario técnico con perfil auditor enfocado en evaluar la calidad arquitectónica y despliegue del proyecto. | - Visualizar logs de funcionamiento a través del administrador de procesos PM2.<br>- Realizar auditoría sobre la consola de AWS a través de un usuario IAM con políticas estrictas de sólo lectura (`EC2ReadOnly`, `CloudWatchReadOnly`).<br>- Probar la API de forma externa utilizando los endpoints documentados. |

---

## 7. Requerimientos Funcionales y No Funcionales

A continuación se detallan los requerimientos del sistema en formato formal y codificado:

### Requerimientos Funcionales (RF)

| ID | Nombre | Descripción | Prioridad |
|---|---|---|---|
| **RF-01** | Autenticación Segura | El sistema debe permitir el registro de usuarios con email único y contraseña cifrada, y el posterior inicio de sesión mediante JWT (JSON Web Tokens). | Alta (Must) |
| **RF-02** | Subida y Extracción | El sistema debe aceptar la subida simultánea de hasta 20 archivos de audio (MP3, WAV, OGG, FLAC) de hasta 50MB, extrayendo automáticamente los metadatos de título, artista y duración del archivo. | Alta (Must) |
| **RF-03** | Visualización de Biblioteca | El sistema debe listar las canciones subidas por el usuario en orden cronológico inverso, incluyendo título, artista, duración y carátula asociada. | Alta (Must) |
| **RF-04** | Streaming de Audio | El sistema debe transmitir el audio de forma eficiente utilizando solicitudes de rango HTTP (*HTTP Range*), permitiendo al usuario adelantar o atrasar la canción en reproducción sin descargar el archivo completo. | Alta (Must) |
| **RF-05** | Cola de Reproducción | El usuario debe poder ver la lista de canciones en cola, agregar pistas para sonar a continuación, y saltar de forma manual hacia adelante o hacia atrás. | Media (Should) |
| **RF-06** | Personalización de HUD | El sistema debe proveer una interfaz interactiva de configuración para modificar en vivo el color hexadecimal del HUD y guardarlo persistentemente. | Alta (Must) |
| **RF-07** | Fondos y Partículas | El usuario debe poder subir una imagen de fondo o seleccionar un color plano, además de configurar efectos interactivos de partículas en movimiento. | Alta (Must) |
| **RF-08** | Gestión de Playlists | El sistema debe permitir crear listas de reproducción, agregar/eliminar canciones de las mismas, y asignarles nombres e imágenes representativas. | Alta (Must) |

### Requerimientos No Funcionales (RNF)

| ID | Nombre | Dimensión de Calidad | Especificación Técnica |
|---|---|---|---|
| **RNF-01** | Seguridad de Datos | Seguridad | Las contraseñas deben ser cifradas en la base de datos usando la función hash robusta `bcrypt`. La API debe validar las firmas JWT en todas las rutas protegidas a nivel de middleware. |
| **RNF-02** | Rendimiento de Carga | Eficiencia / Performance | El tiempo total de renderizado inicial de la SPA del frontend en el navegador del cliente no debe superar los 2.0 segundos bajo condiciones estándar de red (banda ancha 4G/Fibra). |
| **RNF-03** | Portabilidad y Despliegue | Portabilidad | Los servicios backend y la base de datos PostgreSQL deben ejecutarse en contenedores Docker independientes para garantizar la portabilidad entre entornos de desarrollo y producción. |
| **RNF-04** | Resiliencia de Procesos | Confiabilidad / Resiliencia | Ante fallos críticos inesperados de la aplicación de Node.js, el administrador de procesos PM2 debe reiniciar el hilo del backend en menos de 500ms para mitigar caídas de servicio. |
| **RNF-05** | Adaptabilidad Visual | Usabilidad | La interfaz de usuario debe contar con un diseño responsivo fluido (adaptable) que garantice una visualización estéticamente limpia en pantallas de escritorio, portátiles y dispositivos móviles. |

---

## 8. Metodología de Desarrollo

El proyecto Rin'ne se estructuró bajo la metodología ágil **SCRUM**, organizada en tres iteraciones o **Sprints** de dos semanas cada una:
1. **Sprint 1 (Semana 1-2):** Modelamiento del negocio, diseño de la base de datos, creación del repositorio de Git y desarrollo del módulo de autenticación segura (HU-001, HU-002, HU-003).
2. **Sprint 2 (Semana 3-4):** Desarrollo del backend y lógica de carga de archivos (Multer). Implementación del reproductor básico y biblioteca (HU-004, HU-005, HU-006, HU-008, HU-009).
3. **Sprint 3 (Semana 5-6):** Desarrollo de los componentes de personalización estética interactiva y persistencia del HUD. Implementación de cola de reproducción, barra de navegación avanzada, y despliegue final en la nube de AWS con Docker, Nginx y PM2.

Las estimaciones de esfuerzo se calcularon mediante puntos de historia utilizando la serie de Fibonacci modificada, asignándose prioridades bajo la técnica **MoSCoW** (Must, Should, Could, Won't).

---

## 9. Resultados y Discusión del Prototipo

El prototipo funcional de Rin'ne se probó y validó con éxito en el entorno cloud AWS EC2 en la dirección IP pública asignada de forma estática (Elastic IP). Los principales resultados obtenidos revelan:
* **Desempeño del Streaming:** La reproducción y el buffering demostraron alta fluidez y baja latencia gracias a la correcta implementación de las peticiones de rango HTTP. Las canciones comienzan a reproducirse en menos de 500ms tras presionar el botón de inicio.
* **Consistencia de Personalización:** Las preferencias estéticas del HUD se almacenan instantáneamente mediante peticiones API PUT asíncronas optimizadas y se reflejan sin parpadeos al refrescar el navegador del cliente gracias al uso de Zustand persistido localmente y sincronizado en base de datos.
* **Consistencia de Datos:** El PostgreSQL dockerizado maneja exitosamente las eliminaciones en cascada. Al borrar un usuario, todas sus canciones almacenadas en base de datos, relaciones de favoritos, playlists y preferencias del HUD se eliminan correctamente, asegurando la integridad referencial.
* **Seguridad:** Los intentos de acceso no autorizados a endpoints protegidos de la API (ej. listar canciones o subir archivos sin cabecera de `Authorization: Bearer <token>`) devuelven consistentemente códigos de respuesta HTTP `401 Unauthorized` o `403 Forbidden`, validando la efectividad del middleware de Passport JWT.

---

## 10. Referencias Bibliográficas (Formato APA 7)

* Bass, L., Clements, P., & Kazman, R. (2012). *Software Architecture in Practice* (3rd ed.). Addison-Wesley.
* Elmasri, R., & Navathe, S. B. (2015). *Fundamentals of Database Systems* (7th ed.). Pearson.
* Field, R. (2020). *Cloud Computing with AWS: Essentials for Developers*. O'Reilly Media.
* Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
* Schwaber, K., & Beedle, M. (2002). *Agile Software Development with Scrum*. Prentice Hall.
* Somani, A. (2021). *Full Stack Development with React and Node.js: Build modern, scalable, and responsive web applications*. Packt Publishing.
