# Random Lab Studio — sitio web

Sitio estático (HTML + CSS + un poco de JS, sin frameworks ni compilación) para el estudio y sus juegos.
Publicado con GitHub Pages desde `main` / raíz. **Sin cookies, analítica, píxeles, mapas ni fuentes externas.**
Las fuentes (Lilita One y Nunito, licencia OFL) están en `assets/fonts/`.

## Estructura

```
index.html                      Inicio del estudio
fruit-stack/index.html          Página del juego
fruit-stack/privacidad/         Política de privacidad (ES/EN, misma página)
assets/{css,js,fonts,img}/      Recursos compartidos
404.html  robots.txt  sitemap.xml  .nojekyll  favicon.*
_plantilla-juego/               Plantillas para juegos nuevos
```

Todas las rutas internas son **relativas** (`../`, `../../`), así que el sitio funciona igual bajo
`/randomlabstudio.github.io/`, en un repositorio `<cuenta>.github.io` o en un dominio propio.
Las únicas URLs absolutas están en `sitemap.xml`, `robots.txt`, `<link rel="canonical">` y las etiquetas Open Graph:
si cambias de dirección, sustituye `https://randomlabstudio.github.io/` en esos archivos
(`grep -rl "randomlabstudio.github.io" .`). `404.html` también menciona el prefijo (script al final).

## Añadir un juego nuevo en 5 minutos

1. `cp -r fruit-stack mi-juego && cp _plantilla-juego/privacidad.html mi-juego/privacidad/index.html` (la plantilla sustituye a la política de Fruit Stack).
2. Imágenes: icono y capturas en `assets/img/mi-juego/` (WebP, con `width`/`height`).
3. Edita `mi-juego/index.html`: nombre, descripción, características, capturas y enlace a `privacidad/`.
4. Edita `mi-juego/privacidad/index.html`: sustituye `NOMBRE DEL JUEGO`, `JUEGO-SLUG`, fechas y redacta las secciones
   con los datos **reales** del juego (ES y EN).
5. Añade la tarjeta en `index.html` (copia la de Fruit Stack) y las URLs en `sitemap.xml`. Haz commit y push.

## Fecha de la política

En `fruit-stack/privacidad/index.html` busca los comentarios `FECHA DE ACTUALIZACIÓN` / `UPDATE DATE` y cambia el
`<time>` (texto y `datetime`) en el bloque español y en el inglés. Actualiza también `lastmod` en `sitemap.xml`.

## Probar en local simulando el prefijo del sitio de proyecto

```bash
mkdir /tmp/pages && ln -s "$PWD" /tmp/pages/randomlabstudio.github.io
cd /tmp/pages && python3 -m http.server 8000
# abrir http://localhost:8000/randomlabstudio.github.io/
```

## Idioma

Español por defecto; `?lang=en` o el botón ES/EN. La elección se guarda solo en `localStorage` del navegador
(nunca se envía a ningún sitio).

## Pendientes

- Capturas: las recibidas son de 540×960 (no 1080×1920); si hay versiones mayores, sustituirlas en `assets/img/fruit-stack/`.
- Enlace de Google Play: cuando exista la ficha, cambiar la etiqueta «Próximamente» en `fruit-stack/index.html`.
- Decidir la URL definitiva (dirección larga de proyecto, repositorio `<cuenta>.github.io` o dominio propio).
