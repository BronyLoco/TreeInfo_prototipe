# Prototipo App Ambiental - Defensa de Grado

![Expo logo](https://img.shields.io/badge/Expo-49--50--EA?style=for-the-badge&logo=expo&logoColor=white) ![React Native logo](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript logo](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Descripción

Esta aplicación móvil es un **prototipo** desarrollado con **Expo (React Native)** y **TypeScript**. Su creación tiene como objetivo principal servir como **apoyo visual y demostrativo para una defensa de grado** enfocada en la **concientización sobre el cuidado del medio ambiente**.

**Nota:** Al ser un prototipo, la funcionalidad está en desarrollo y sirve como prueba de concepto para las ideas presentadas en la investigación de grado.

## Contexto Académico

Este proyecto fue desarrollado para apoyar la defensa de grado de [Nombre del Amigo/Tesista - ¡Asegúrate de poner su nombre aquí!] en [Nombre de la Carrera o Programa] de la [Nombre de la Universidad/Institución]. La aplicación busca ilustrar de manera práctica algunos de los conceptos y propuestas discutidos en su trabajo sobre [Breve descripción del tema de la tesis, ej. "la importancia de la reforestación", "el impacto del reciclaje", "la educación ambiental a través de la tecnología"].

## Características Actuales (Prototipo)

*   **Pantalla de Presentación:** Mensaje inicial de concientización ambiental.
*   **Navegación Principal:** Menú lateral desplegable (Drawer) implementado con Expo Router y React Navigation.
    *   Pantalla de Inicio (`Home`)
    *   Pantalla de Perfil (`Profile` - estructura básica)
    *   Pantalla de Configuración (`Settings`)
*   **Selector de Tema:** Permite cambiar entre modo claro y modo oscuro. La preferencia se guarda localmente (usando AsyncStorage).
*   **Tematización Centralizada:** Archivo de configuración de colores (`constants/Colors.js`) para facilitar cambios visuales y mantener consistencia.

## Tecnologías Utilizadas

*   **Expo SDK:** Framework para construir aplicaciones universales React.
*   **React Native:** Biblioteca para construir interfaces de usuario nativas con React.
*   **Expo Router:** Sistema de enrutamiento basado en archivos para navegación.
*   **React Navigation (Drawer):** Librería para la implementación del menú desplegable.
*   **TypeScript:** Superset de JavaScript para añadir tipado estático.
*   **React Context API:** Para la gestión del estado del tema (claro/oscuro).
*   **AsyncStorage:** Para persistir la preferencia del tema del usuario.

## Requisitos Previos

*   [Node.js](https://nodejs.org/) (Versión LTS recomendada)
*   [Git](https://git-scm.com/)
*   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
*   Dispositivo Móvil (Android/iOS) con la app **Expo Go** instalada, O
*   Emulador de Android / Simulador de iOS configurado.

## Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/BronyLoco/TreeInfo_prototipe.git
    ```
    *(Reemplaza la URL si es diferente)*

2.  **Navega al directorio del proyecto:**
    ```bash
    cd TreeInfo_prototipe
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
    *(o `yarn install` si usas Yarn)*

## Ejecución del Prototipo

1.  **Inicia el servidor de desarrollo Expo:**
    ```bash
    npx expo start
    ```

2.  **Abre la aplicación:**
    *   **En dispositivo físico:** Escanea el código QR mostrado en la terminal o en el navegador con la app Expo Go.
    *   **En Emulador/Simulador:**
        *   Presiona `a` en la terminal para abrir en un emulador Android (debe estar ejecutándose).
        *   Presiona `i` en la terminal para abrir en un simulador iOS (requiere macOS y Xcode).
        *   Presiona `w` para intentar abrir en el navegador web (funcionalidad experimental).

## Estructura del Proyecto (Clave)

*   `app/`: Contiene las pantallas y la configuración de rutas (Expo Router).
    *   `_layout.tsx`: Define la estructura principal de navegación (Drawer Navigator).
    *   `index.tsx`: Pantalla de presentación inicial.
    *   `home.tsx`, `profile.tsx`, `settings.tsx`: Otras pantallas de la aplicación.
*   `assets/`: Recursos estáticos como imágenes y fuentes.
*   `constants/`: Archivos de configuración reutilizables.
    *   `Colors.js`: Define la paleta de colores para los temas claro y oscuro.
*   `context/`: Contiene los Contextos de React.
    *   `ThemeContext.tsx`: Gestiona el estado y la persistencia del tema de la aplicación.
*   `babel.config.js`: Configuración del compilador Babel.
*   `package.json`: Lista de dependencias y scripts del proyecto.

## Licencia

Este proyecto se distribuye bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles (Puedes añadir un archivo LICENSE si lo deseas, el MIT es una buena opción estándar y permisiva).

---

*Desarrollado como prototipo de apoyo académico.*