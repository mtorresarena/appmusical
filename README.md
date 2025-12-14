# Aula Musical Interactiva 🎵

Una aplicación web educativa diseñada para el aula de música. Permite a los estudiantes explorar las notas musicales, experimentar con diferentes instrumentos y entrenar su oído mediante juegos interactivos.

## ✨ Características

- **Instrumentos Virtuales**: Piano, Guitarra y Flauta sintetizados en tiempo real con Web Audio API.
- **Visualización**: Teclas interactivas con nombres de notas (Do, Re, Mi...) y notación científica.
- **Juego de Oído**: Modo "Adivina la nota" con sistema de puntuación.
- **IA Integrada**: Curiosidades musicales generadas por Google Gemini según el instrumento seleccionado.
- **Diseño Responsivo**: Funciona en pizarras digitales, tablets y ordenadores.

## 🛠️ Tecnologías

- **React 19**: Biblioteca de UI.
- **Tailwind CSS**: Estilos y diseño.
- **Web Audio API**: Síntesis de sonido sin archivos de audio externos.
- **Google GenAI SDK**: Integración con modelos Gemini para contenido educativo.

## 🚀 Instalación y Uso

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tu API Key:
   - Crea un archivo `.env` en la raíz.
   - Añade tu clave: `API_KEY=tu_clave_de_gemini_aqui`
4. Inicia la aplicación:
   ```bash
   npm start
   ```

## 📝 Licencia

Este proyecto es de uso educativo y libre.