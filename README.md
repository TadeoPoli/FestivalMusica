# 🎧 FestivalMusica

**FestivalMusica** es un sitio web estático para un festival ficticio de música electrónica. El proyecto presenta una portada audiovisual, información del evento, un lineup, una galería interactiva y opciones de pases, poniendo en práctica maquetación responsive, estilos con Sass y comportamiento dinámico con JavaScript nativo.

> **Nota:** Este proyecto fue desarrollado con fines educativos siguiendo un curso de desarrollo web. El sitio representa un festival ficticio y se utiliza únicamente como demostración de habilidades de desarrollo Front-End. Los eventos, fechas, precios y demás información presentada no corresponden a un festival real.

## 📸 Recorrido visual

### Portada y presentación

La página inicial combina un video de fondo, navegación hacia las secciones del sitio y una presentación del festival. La maqueta está pensada para adaptarse a pantallas de escritorio y dispositivos móviles.

![Portada y presentación del festival](<screenshots/Captura de pantalla 2026-09-29 110229.png>)

### Lineup

La sección de artistas organiza el cronograma visual por géneros y jornadas. Su contenido es estático e ilustrativo.

![Lineup del festival](<screenshots/Captura de pantalla 2026-09-29 110252.png>)

### Galería interactiva

La galería genera sus elementos desde JavaScript y permite ampliar cada imagen en un modal. El modal se puede cerrar con el botón correspondiente, haciendo clic fuera de la imagen o mediante la tecla <kbd>Esc</kbd>.

![Galería interactiva](<screenshots/Captura de pantalla 2026-09-29 110306.png>)

### Pases

La sección final muestra visualmente alternativas de pases y sus beneficios. No incluye compra, pagos ni integración con servicios externos; los importes son únicamente de demostración.

![Sección de pases](<screenshots/Captura de pantalla 2026-09-29 110327.png>)

## ✨ Funcionalidades principales

- Navegación interna entre secciones mediante enlaces ancla.
- Encabezado que adapta su apariencia durante el desplazamiento de la página.
- Video local de portada con formatos alternativos para el navegador.
- Lineup y opciones de pases presentados mediante componentes visuales responsive.
- Galería generada con JavaScript y modal accesible para ampliar imágenes.
- Cierre del modal mediante botón, clic en el fondo o tecla <kbd>Esc</kbd>.
- Diseño adaptable para escritorio y dispositivos móviles.
- Entrega de imágenes JPEG, WebP y AVIF para navegadores compatibles.

## 🧰 Tecnologías utilizadas

- **HTML5:** estructura semántica del sitio.
- **SCSS / Sass:** estilos, variables, mixins y diseño responsive.
- **JavaScript nativo:** navegación, comportamiento del header y galería modal.
- **Gulp:** automatización de compilación, minificación y procesamiento de recursos.
- **Sharp:** creación de formatos de imagen optimizados y miniaturas de la galería.
- **AVIF, WebP y JPEG:** formatos alternativos de imagen para optimizar la carga.
- **Responsive Design:** adaptación del layout a diferentes tamaños de pantalla.

## 📁 Estructura general

```text
FestivalMusica/
├── src/
│   ├── img/             # Imágenes fuente y galería
│   ├── js/              # JavaScript fuente
│   └── scss/            # Estilos SCSS fuente
├── build/
│   ├── css/             # CSS compilado
│   ├── img/             # Imágenes optimizadas
│   └── js/              # JavaScript compilado
├── video/               # Video local de portada y formatos alternativos
├── screenshots/         # Capturas incluidas en este documento
├── index.html           # Punto de entrada estático
├── gulpfile.js           # Tareas de automatización
└── package.json          # Scripts y dependencias de Node.js
```

## ⚙️ Requisitos e instalación local

### Requisitos

- [Node.js](https://nodejs.org/) 20 o superior y npm.
- Python 3, únicamente si se desea usar el servidor estático indicado más abajo.
- Un navegador web actualizado.

### Instalación de dependencias

Desde la raíz del proyecto, instalá las versiones bloqueadas en `package-lock.json`:

```bash
npm ci
```

### Desarrollo

```bash
npm run dev
```

Este comando inicia las tareas de observación de SCSS, JavaScript e imágenes para recompilar los recursos cuando cambian. Como el modo de desarrollo observa cambios posteriores, generá primero los recursos si partís de una instalación nueva:

```bash
npm run build
```

### Build de producción

```bash
npm run build
```

El build procesa miniaturas de la galería, compila y minifica CSS y JavaScript, y genera variantes JPEG, WebP y AVIF de las imágenes. Finaliza al completar las tareas, sin quedar observando archivos.

### Visualización local

Después de generar el build, podés servir el sitio estático desde la raíz del proyecto con:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Luego abrí [http://127.0.0.1:8000/](http://127.0.0.1:8000/) en el navegador.

## 🔧 Pipeline de Gulp

| Tarea | Función |
| --- | --- |
| `crop` | Genera miniaturas JPEG para la galería a partir de las imágenes fuente. |
| `css` | Compila SCSS, aplica PostCSS/Autoprefixer y minifica el CSS generado. |
| `js` | Minifica el JavaScript de `src/js/` y genera su mapa de código. |
| `images` | Procesa imágenes fuente y crea versiones JPEG, WebP y AVIF. |
| `dev` | Observa cambios para recompilar recursos durante el desarrollo. |
| `build` | Ejecuta el procesamiento completo de recursos y termina al finalizar. |

## 📱 Diseño responsive y optimización de imágenes

El layout utiliza media queries y componentes flexibles para reorganizar navegación, bloques de contenido, lineup, galería y pases según el ancho disponible.

Las imágenes se procesan durante el build para ofrecer formatos modernos cuando el navegador los admite. La etiqueta `picture` permite utilizar AVIF o WebP y conservar JPEG como alternativa de compatibilidad. Sharp también genera miniaturas para reducir el peso visual de la galería antes de abrir una imagen ampliada.

## ✅ Estado del proyecto

El proyecto se encuentra funcional como sitio Front-End estático. La instalación de dependencias mediante `npm ci` y el build con `npm run build` fueron comprobados localmente; también se verificaron manualmente la navegación, el header, la galería, el modal y el diseño responsive.

## Consideraciones

- El proyecto no incluye backend, base de datos, autenticación, pagos ni venta real de entradas.
- El contenido del festival es ficticio y tiene una finalidad exclusivamente demostrativa.
- La procedencia y las condiciones de redistribución de las imágenes, video, artistas y demás recursos visuales deben confirmarse antes de publicar el proyecto en un repositorio público.
- No existe una versión desplegada públicamente en este momento.
