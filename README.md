# Portafolio de Tulio Contreras

Sitio nuevo desarrollado desde cero con Astro para presentar proyectos, trayectoria y contacto profesional. La experiencia central es un laboratorio de software: transferencias simuladas, búsqueda con favoritos y revisión de tareas por roles. Los casos explican el código de proyectos públicos y distinguen esas aplicaciones de las demos independientes del portafolio.

## Desarrollo

Requiere Node.js 22.12 o superior y pnpm 11.25.0. El archivo de bloqueo conserva las versiones utilizadas.

```sh
corepack enable
pnpm install
pnpm dev
```

## Compilación

```sh
node --test tests/lab-model.test.mjs
pnpm build
pnpm preview
```

El sitio se genera en `dist/`. No necesita base de datos, claves ni servicios de pago.

## Contenido

- `src/data/projects.ts`: proyectos, tecnologías, alcance y enlaces.
- `src/pages/index.astro`: presentación principal.
- `src/pages/proyectos/[slug].astro`: páginas de proyectos.
- `src/styles/global.css`: estilos y adaptación a móvil.
- `public/CV_Tulio_Contreras.pdf`: CV descargable.
- `ASSET_SOURCES.md`: origen y licencias de las imágenes y fuentes.

## GitHub Pages

El repositorio previsto es `Tulio-Contreras.github.io`. La dirección se configura en `astro.config.mjs`. El flujo `.github/workflows/deploy.yml` compila y publica con la acción oficial de Astro. Seleccionar GitHub Actions como origen de Pages en la configuración del repositorio.

Si se utiliza otro nombre de repositorio, adaptar `site` y `base` antes de publicar. La existencia de este flujo no confirma un despliegue: comprobar su ejecución y la URL pública.

## Datos y privacidad

El sitio incluye únicamente información profesional del CV y los perfiles propios y referencias a repositorios públicos. No se publica código ni información privada de Brighton. Bank App se identifica como demo educativa. No se han añadido métricas, testimonios ni fechas no confirmadas.

## Demos y SEO

Las demos usan un modelo puro en `src/lib/lab-model.mjs` y un controlador de interfaz en `src/scripts/lab-controller.ts`. Las transferencias trabajan en centavos enteros; los rechazos conservan el estado. Los favoritos usan localStorage con alternativa de sesión si el navegador lo bloquea. Las tareas validan el rol antes de cambiar de fase. El selector de roles sirve únicamente para explorar la demo local.

Las pruebas cubren conservación del saldo, formato monetario, rechazos sin mutación, búsqueda y transiciones autorizadas. El laboratorio no hace llamadas a APIs financieras ni ejecuta el código de los repositorios originales.

HTML estático con títulos, descripciones y canonical por ruta, JSON-LD Person/WebSite/SoftwareSourceCode/BreadcrumbList, sitemap y robots. El contenido y los enlaces siguen disponibles sin JavaScript. Esto facilita el rastreo; no supone una garantía de indexación ni de posicionamiento.
