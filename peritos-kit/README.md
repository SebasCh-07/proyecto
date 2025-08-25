# Plataforma Peritos — Maquetado (Vite + React)

Este es un **kit descargable** con un maquetado funcional para la plataforma de **Peritos Avaloradores**:

- Login con dos roles (Admin / Perito).
- Admin con dos pestañas: **Clientes** y **Peritos**.
  - Lista de peritos con ✔ / ❌ según disponibilidad.
  - Al hacer click en un perito se abre un menú con acciones (asignar, historial, mapa).
- Perito con lista de **requerimientos asignados**.
  - Detalle con: **marcar llegada + GPS**, **cronómetro en sitio**, **subida de fotos/videos (máx. 40s)**, **subida de informe**, **contadores de tiempo**.

> Es un maquetado front-end sin backend. Usa estado local y `localStorage` para la sesión.

## Requisitos
- Node.js 18+

## Instalación
```bash
npm install
npm run dev
```
Abre la URL que te muestre Vite (ej: http://localhost:5173).

## Estructura
```
peritos-kit/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ App.jsx
   ├─ data.js
   ├─ styles.css
   ├─ main.jsx
   └─ components/
      ├─ Login.jsx
      ├─ Admin.jsx
      └─ Perito.jsx
```

## Notas
- El mapa utiliza **Google Maps (embed)** a partir del GPS del navegador (si el usuario da permisos).
- La validación de video <= 40s se realiza leyendo la metadata del archivo.
- Puedes conectar esto a tu API (Node, Python, etc.) reemplazando los mocks en `data.js` y las acciones `alert(...)`.
