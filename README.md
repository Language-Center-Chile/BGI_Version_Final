# Land Advisors

Sitio web corporativo de **Land Advisors**, una firma chilena especializada en **intermediación de suelo urbano, activos estratégicos y oportunidades inmobiliarias**. La plataforma presenta la empresa, su portafolio de operaciones realizadas, servicios a propietarios y un formulario de contacto conectado a un webhook de **n8n**.

> _"Suelo urbano, activos estratégicos. Desarrollo inmobiliario."_

---

## Tabla de contenidos

- [Land Advisors](#land-advisors)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción general](#descripción-general)
  - [Características](#características)
  - [Stack tecnológico](#stack-tecnológico)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Instalación y uso local](#instalación-y-uso-local)
    - [Requisitos](#requisitos)
    - [Opción 1: Abrir directamente](#opción-1-abrir-directamente)
    - [Opción 2: Servidor local (recomendado)](#opción-2-servidor-local-recomendado)
  - [Configuración del formulario (n8n)](#configuración-del-formulario-n8n)
    - [1. Crear el workflow en n8n](#1-crear-el-workflow-en-n8n)
    - [2. Configurar la URL en el proyecto](#2-configurar-la-url-en-el-proyecto)
    - [Payload enviado](#payload-enviado)
  - [Personalización](#personalización)
    - [Colores y tipografía](#colores-y-tipografía)
    - [Datos de contacto](#datos-de-contacto)
    - [Operaciones realizadas](#operaciones-realizadas)
    - [Logos de clientes](#logos-de-clientes)
  - [Secciones del sitio](#secciones-del-sitio)
  - [Assets e imágenes](#assets-e-imágenes)
  - [Accesibilidad y rendimiento](#accesibilidad-y-rendimiento)
  - [Compatibilidad de navegadores](#compatibilidad-de-navegadores)
  - [Créditos](#créditos)
  - [Licencia](#licencia)

---

## Descripción general

Este proyecto es el **sitio web institucional** de Land Advisors. Es una **landing page estática** (HTML + CSS + JavaScript vanilla, sin frameworks) orientada a:

- Mostrar la propuesta de valor de la firma.
- Exhibir operaciones realizadas (portafolio selectivo).
- Mostrar clientes y aliados del mercado inmobiliario.
- Presentar servicios para propietarios de terrenos y activos urbanos.
- Captar leads mediante un formulario de contacto integrado con **n8n** y un botón flotante de **WhatsApp**.

El sitio está optimizado para ser **ligero, rápido y de fácil despliegue** en cualquier hosting estático (Netlify, Vercel, GitHub Pages, hosting tradicional, etc.).

---

## Características

- **Diseño responsive** (mobile-first) con menú hamburguesa en dispositivos móviles.
- **Scroll suave** en la navegación interna (anchor links).
- **Header con sombra dinámica** al hacer scroll.
- **Carrusel infinito de clientes** animado por CSS (con respaldo JS para usuarios con `prefers-reduced-motion: reduce`).
- **Portafolio de operaciones** con tarjetas interactivas (overlay con información detallada).
- **Sección "Nosotros"** y **"Servicios para propietarios"** con diseño limpio y profesional.
- **Formulario de contacto** con validación en cliente y envío a un **webhook de n8n** vía `fetch`.
- **Botón flotante de WhatsApp** siempre visible.
- **Validación de email** contra proveedores reales (Gmail, Outlook, Yahoo, Hotmail, iCloud, Proton).
- **Validación de teléfono chileno** (9 dígitos).
- **Estados del botón de envío**: normal, enviando (spinner), enviado (check), error.
- **Sin dependencias de build**: solo HTML, CSS y JS puros.

---

## Stack tecnológico

| Capa       | Tecnología                                                    |
| ---------- | ------------------------------------------------------------- |
| Marcado    | HTML5                                                        |
| Estilos    | CSS3 (custom properties, flexbox, grid, animaciones)          |
| Lógica     | JavaScript (ES6+, vanilla, sin frameworks)                    |
| Tipografía | [Google Fonts — Montserrat](https://fonts.google.com/specimen/Montserrat) |
| Iconos     | [Font Awesome 6](https://fontawesome.com/) (vía CDN)          |
| Backend    | [n8n](https://n8n.io/) (webhook para el formulario)           |
| Contacto   | [WhatsApp Click-to-Chat](https://wa.me/)                      |

**No se requiere:** Node.js, npm, bundler ni proceso de build.

---

## Estructura del proyecto

```
BLANCOGESTIONINMOBILIARIA/
├── index.html              # Página principal (HTML semántico)
├── style.css               # Estilos (CSS custom, responsive)
├── script.js               # Lógica: scroll, menú, form, carrusel
├── README.md               # Este archivo
└── img/
    ├── hero.png            # Imagen principal del hero
    ├── BANCODECHILE.jpg    # Logos de clientes
    ├── Contrucciones/
    │   └── *.jpg           # Imágenes de proyectos/edificios
    └── Planos/
        └── *.jpeg          # Planos y mapas
```

---

## Instalación y uso local

### Requisitos

- Un navegador moderno (Chrome, Firefox, Edge, Safari).
- Opcional: un servidor local (Live Server, `http-server`, Python, etc.) para evitar restricciones de CORS al abrir el archivo directamente.

### Opción 1: Abrir directamente

1. Descarga o clona el repositorio.
2. Haz doble clic en `index.html`.
3. El sitio se abrirá en tu navegador por defecto.

### Opción 2: Servidor local (recomendado)

Con **Python 3**:

```bash
cd BLANCOGESTIONINMOBILIARIA
python -m http.server 8000
```

Luego abre [http://localhost:8000](http://localhost:8000) en tu navegador.

Con **npx (Node.js)**:

```bash
npx serve .
```

Con **VS Code**: instala la extensión _Live Server_ y haz clic derecho sobre `index.html` → _Open with Live Server_.

---

## Configuración del formulario (n8n)

El formulario de contacto envía los datos a un **webhook de n8n** mediante una petición `POST` con `Content-Type: application/json`.

### 1. Crear el workflow en n8n

1. En n8n, crea un nuevo workflow.
2. Añade un nodo **Webhook** como trigger y configúralo con método `POST`.
3. Copia la URL del webhook (algo como `https://tu-n8n.example.com/webhook/xxxxx`).
4. Opcional: añade nodos para enviar un correo, guardar en Google Sheets, notificar por Slack, etc.

### 2. Configurar la URL en el proyecto

Edita [script.js](script.js) y reemplaza la constante `N8N_WEBHOOK_URL`:

```js
const N8N_WEBHOOK_URL = 'https://tu-n8n.example.com/webhook/ID-DEL-WEBHOOK';
```

### Payload enviado

El cliente envía el siguiente JSON al webhook:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@gmail.com",
  "telefono": "979757441",
  "asunto": "Gracias por contactarte",
  "mensaje": "Mensaje del usuario...",
  "timestamp": "2026-06-19T12:00:00.000Z",
  "origen": "https://tusitio.cl/"
}
```

---

## Personalización

### Colores y tipografía

Edita las **CSS custom properties** en [style.css](style.css):

```css
:root {
  --primary:   #001E42;  /* Azul institucional */
  --black:     #001E42;
  --navy:      #0854aaa4;
  --white:     #FFFFFF;
  --bg-light:  #F4F7F9;
  --border:    #D1D9E0;
  --text-dark: #2D3748;
  --text-mid:  #718096;
  --accent:    #C9A84C;  /* Dorado de acento */
  --radius:    4px;
}
```

### Datos de contacto

En [index.html](index.html), actualiza:

- **WhatsApp**: `href="https://wa.me/"` (botón flotante y footer).
- **Teléfono**: `+56 9 7975 7441`.
- **Email**: `palomaperez@bgichile.cl`.
- **Dirección**: `Av. Apoquindo 7935, oficina 410-B, Las Condes`.
- **Google Maps**: link en el footer.
- **Año del copyright** en el footer: `© 2026 Land Advisors...`.

### Operaciones realizadas

Para añadir una nueva operación, duplica un bloque `.property-card` dentro de la sección `#operaciones` en [index.html](index.html) y reemplaza:

- La imagen (`<img src="img/Planos/...">`).
- El título de la barra (`<div class="card-title-bar">`).
- Los campos del overlay (ubicación, superficie, estado, gestión).

### Logos de clientes

Reemplaza las imágenes en la sección `#clientes` del HTML. El carrusel está duplicado intencionalmente para generar el **loop infinito**; asegúrate de mantener ambos sets sincronizados.

---

## Secciones del sitio

| Sección       | ID           | Descripción                                                  |
| ------------- | ------------ | ------------------------------------------------------------ |
| Hero          | `#hero`      | Imagen de fondo con titular principal y propuesta de valor.  |
| Operaciones   | `#operaciones` | Portafolio selectivo de activos gestionados.               |
| Clientes      | `#clientes`  | Carrusel infinito con logos de inmobiliarias y aliados.      |
| Nosotros      | `#nosotros`  | Descripción de la firma y su enfoque.                        |
| Propietarios  | `#propietarios` | Servicios ofrecidos a propietarios de activos urbanos.    |
| Contacto      | `#contacto`  | Formulario conectado al webhook de n8n.                      |
| Footer        | —            | Datos de contacto, marca, copyright.                          |

---

## Assets e imágenes

Todas las imágenes se encuentran en la carpeta `img/`:

- `img/hero.png` — Imagen principal del hero.
- `img/BANCODECHILE.jpg` — Placeholder de logos de clientes.
- `img/Contrucciones/` — Fotos de proyectos y edificios.
- `img/Planos/` — Planos y material gráfico de operaciones.

Recomendaciones:

- Usa formatos modernos (**WebP / AVIF**) para mejorar el rendimiento.
- Comprime las imágenes con herramientas como [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/).
- Mantén un tamaño máximo recomendado de **500 KB** por imagen.

---

## Accesibilidad y rendimiento

- HTML semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Atributos `alt` en todas las imágenes.
- `aria-label` en el botón hamburguesa y el enlace flotante de WhatsApp.
- Contraste de color siguiendo buenas prácticas WCAG.
- `prefers-reduced-motion: reduce` respetado en el carrusel de clientes.
- Carga de fuentes con `preconnect` y `display=swap` para evitar bloqueos de render.
- Sin librerías externas pesadas: solo Font Awesome vía CDN y Google Fonts.

---

## Compatibilidad de navegadores

- Chrome / Edge (últimas 2 versiones).
- Firefox (últimas 2 versiones).
- Safari (últimas 2 versiones).
- Navegadores móviles: iOS Safari 14+, Chrome Android 90+.

---

## Créditos

- **Diseño y desarrollo:** Land Advisors.
- **Tipografía:** [Montserrat](https://fonts.google.com/specimen/Montserrat) — Google Fonts.
- **Iconos:** [Font Awesome 6](https://fontawesome.com/).
- **Automatización:** [n8n](https://n8n.io/).

---

## Licencia

© 2026 **Land Advisors**. Todos los derechos reservados.

Este código se distribuye con fines internos de la empresa. Queda prohibida su reproducción total o parcial sin autorización previa.
