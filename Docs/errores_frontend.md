# Registro de Errores y Mejoras Pendientes (Frontend)

Este documento contiene la lista de bugs y funcionalidades faltantes identificadas durante las pruebas iniciales del frontend, para tenerlas en cuenta y corregirlas a continuación.

## 🎵 1. Reproducción de Audio
- **Problema:** Las canciones se importan correctamente a la base de datos, pero **no inician su reproducción** al hacer clic en ellas o al presionar play. 
- **Causa probable:** Problemas con la integración de `Howler.js`, rutas relativas incorrectas para el streaming, o problemas de CORS/Autenticación al solicitar el archivo de audio.

## 👤 2. Menú de Perfil
- **Problema:** No se abre el menú de personalizar perfil. El botón existe en la barra lateral pero no tiene acción asignada.
- **Solución requerida:** Crear un modal o pantalla de "Editar Perfil" y conectarlo al estado del botón.

## ⚙️ 3. Menú de Configuración
- **Problema:** El menú general de configuración (el engranaje en el panel del player) no abre.
- **Solución requerida:** Conectar el icono de Settings (arriba a la derecha del reproductor) a un panel o función.

## 🎨 4. Personalización del HUD
- **Problema:** Los colores del HUD no se aplican correctamente o no persisten de manera visual.
- **Solución requerida:** Crear un botón explícito de **"Aplicar cambios"** en el apartado de configuración del HUD, asegurando que las variables CSS (`--tw-color-primary`) se actualicen forzosamente en el DOM al guardar.

## ✏️ 5. Edición de Canciones
- **Problema:** Falta el símbolo del lápiz (botón de edición) en los ítems individuales de las canciones dentro de la biblioteca y/o el reproductor.
- **Solución requerida:** Añadir el ícono `<Edit2 />` al componente `Library.tsx` y en el reproductor para permitir editar los metadatos (título/artista) después de subirla.

## 📂 6. Apartado de Playlists
- **Problema:** El apartado de "Playlist" en la barra lateral no sirve / no abre nada.
- **Solución requerida:** Implementar la vista/componente de Playlists y manejar la navegación o el estado para alternar entre "Music" (Biblioteca completa) y "Playlists".
