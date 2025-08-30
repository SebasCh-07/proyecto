# 🚀 Plataforma Peritos Kit

Sistema completo de gestión de peritos y requerimientos, **100% responsive** para web y móvil.

## ✨ Características

### 📱 **Responsive Design**
- **Web**: Optimizado para desktop y tablets
- **Móvil**: Diseño adaptativo con menú hamburguesa
- **Touch-friendly**: Botones y elementos optimizados para dispositivos táctiles
- **Breakpoints**: 1200px, 768px, 480px

### 🌐 **PWA (Progressive Web App)**
- **Instalable**: Se puede instalar como app en móviles
- **Offline**: Funciona sin conexión a internet
- **Service Worker**: Cache automático de recursos
- **Manifest**: Configuración para instalación

### 🎨 **UI/UX Mejorada**
- **Material Design**: Componentes MUI optimizados
- **Animaciones**: Transiciones suaves y hover effects
- **Colores**: Sistema de variables CSS consistente
- **Tipografía**: Escalable y legible en todos los dispositivos

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router DOM
- **Estilos**: CSS moderno con variables
- **PWA**: Service Worker + Manifest

## 📱 **Responsive Features**

### **Desktop (>768px)**
- Layout de 3 columnas con imágenes de fondo
- Navegación horizontal completa
- Hover effects y animaciones

### **Tablet (≤768px)**
- Layout de 2 columnas
- Navegación adaptativa
- Elementos redimensionados

### **Móvil (≤480px)**
- Layout de 1 columna
- Menú hamburguesa
- Botones touch-friendly (44px mínimo)
- Formularios optimizados

## 🚀 **Instalación**

```bash
# Clonar repositorio
git clone [url-del-repositorio]
cd peritos-kit

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📱 **Instalación PWA**

### **Chrome/Edge**
1. Abrir la aplicación en el navegador
2. Hacer clic en el icono de instalación en la barra de direcciones
3. Seleccionar "Instalar"

### **Safari (iOS)**
1. Abrir la aplicación en Safari
2. Tocar el botón compartir
3. Seleccionar "Añadir a pantalla de inicio"

### **Android**
1. Abrir en Chrome
2. Tocar el menú de 3 puntos
3. Seleccionar "Añadir a pantalla de inicio"

## 🎯 **Funcionalidades**

### **Administrador**
- Gestión de clientes
- Gestión de peritos
- Creación de requerimientos
- Asignación de tareas

### **Perito**
- Ver requerimientos asignados
- Aceptar/rechazar tareas
- Marcar como en curso
- Finalizar con evidencias

## 🔧 **Personalización**

### **Colores**
Editar variables CSS en `src/styles.css`:
```css
:root {
  --brand: #3b82f6;      /* Color principal */
  --accent: #10b981;     /* Color de éxito */
  --danger: #ef4444;     /* Color de peligro */
}
```

### **Breakpoints**
Modificar en `src/styles.css`:
```css
@media (max-width: 768px) { /* Tablet */
@media (max-width: 480px) { /* Móvil */
```

## 📊 **Performance**

- **Lazy Loading**: Componentes cargados bajo demanda
- **Service Worker**: Cache inteligente
- **Optimización**: Imágenes y recursos optimizados
- **Bundle**: Vite para build rápido

## 🌟 **Ventajas del Diseño Responsive**

1. **Una sola base de código** para web y móvil
2. **Mejor SEO** con diseño adaptativo
3. **Experiencia consistente** en todos los dispositivos
4. **Mantenimiento simplificado** sin duplicar código
5. **Instalación nativa** como PWA en móviles

## 🔮 **Próximas Mejoras**

- [ ] Notificaciones push
- [ ] Sincronización offline
- [ ] Temas personalizables
- [ ] Modo oscuro
- [ ] Accesibilidad mejorada

## 📞 **Soporte**

Para dudas o sugerencias, contactar al equipo de desarrollo.

---

**Desarrollado con ❤️ para optimizar la gestión de peritos**
