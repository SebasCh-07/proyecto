# 🏢 Plataforma Peritos - Sistema de Gestión de Peritos Inmobiliarios

## 📋 Descripción del Proyecto

**Plataforma Peritos** es una aplicación web desarrollada en React que permite gestionar de manera eficiente el trabajo de peritos inmobiliarios, facilitando la asignación de requerimientos, seguimiento de tareas y documentación de evidencias.

## 🎯 Objetivo

El objetivo principal es digitalizar y optimizar el proceso de gestión de peritos inmobiliarios, proporcionando:

- **Gestión centralizada** de clientes y peritos
- **Asignación automática** de requerimientos
- **Seguimiento en tiempo real** del estado de las tareas
- **Documentación completa** con evidencias multimedia
- **Interfaz responsive** para uso en dispositivos móviles y escritorio

## 🚀 Características Principales

### 👨‍💼 Para Administradores
- **Gestión de Clientes**: Crear, editar y eliminar clientes
- **Gestión de Peritos**: Agregar nuevos peritos al sistema
- **Asignación de Requerimientos**: Crear y asignar tareas a peritos específicos
- **Seguimiento de Progreso**: Monitorear el estado de todos los requerimientos
- **Historial Completo**: Acceso a detalles completos de clientes y sus requerimientos
- **Reasignación**: Cambiar peritos en requerimientos finalizados

### 🔍 Para Peritos
- **Dashboard Personalizado**: Vista de requerimientos asignados
- **Estados de Tarea**: Marcar requerimientos como "En Proceso" o "Finalizado"
- **Subida de Evidencias**: Documentar trabajo con fotos, videos y PDFs
- **GPS Integration**: Captura automática de ubicación
- **Observaciones**: Agregar notas detalladas del trabajo realizado

## 🖥️ Pantallas y Funcionalidades

### 🔐 Pantalla de Login
- **Acceso por roles**: Administrador o Perito
- **Credenciales predefinidas** para testing
- **Persistencia de sesión** con localStorage

**Credenciales de prueba:**
- **Admin**: `admin123` / `adminpass`
- **Perito 1**: `perito1` / `peritopass`
- **Perito 2**: `perito2` / `clave123`
- **Perito 3**: `perito3` / `ruizpass`
- **Perito 4**: `perito4` / `torres123`

### 🏠 Dashboard Administrador
- **Vista general** del sistema
- **Estadísticas** de requerimientos
- **Acceso rápido** a funciones principales
- **Navegación** a módulos de gestión

### 👥 Gestión de Clientes
- **Lista de clientes** con información básica
- **Búsqueda** por nombre o ID
- **Crear nuevo cliente** con datos completos
- **Eliminar clientes** con confirmación
- **Ver historial** de requerimientos por cliente

### 🔍 Detalle de Cliente
- **Información del perito asignado**
- **Lista de requerimientos** con ese perito específico
- **Navegación** a detalles completos de requerimientos
- **Tarjetas clickeables** para mejor UX

### 📋 Gestión de Requerimientos
- **Lista completa** de todos los requerimientos
- **Filtros por estado**: Asignado, En Proceso, Finalizado
- **Crear nuevos requerimientos** con asignación automática
- **Vista detallada** con evidencias completas

### 🔍 Detalle de Requerimiento (Admin)
- **Información completa** del perito y cliente
- **Detalles del requerimiento**: dirección, plazo, tiempo
- **Evidencias multimedia**:
  - 🗺️ **Mapa GPS** embebido
  - 📸 **Galería de fotos** (2 imágenes reales)
  - 🎥 **Video** de evidencia
  - 📄 **PDF** del informe
- **Observaciones detalladas** con timestamps
- **Reasignación** de peritos

### 👨‍💼 Dashboard Perito
- **Requerimientos asignados** organizados por estado
- **Acceso rápido** a tareas pendientes
- **Progreso visual** del trabajo

### 📱 Vista Móvil del Perito
- **Interfaz optimizada** para dispositivos móviles
- **Navegación táctil** intuitiva
- **Subida de evidencias** desde el dispositivo
- **GPS automático** para ubicación

### 🔍 Detalle de Requerimiento (Perito)
- **Vista simplificada** enfocada en la tarea
- **Subida de evidencias** multimedia
- **Cambio de estado** del requerimiento
- **Observaciones** del trabajo realizado

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Framework principal
- **React Router DOM 7.8.2** - Navegación
- **Vite 7.1.3** - Build tool y dev server
- **CSS3** - Estilos personalizados
- **Responsive Design** - Adaptable a móviles

### Dependencias Adicionales
- **@mui/material** - Componentes de UI
- **@mui/icons-material** - Iconografía
- **lucide-react** - Iconos adicionales
- **react-icons** - Más opciones de iconos
- **@emotion/react** - CSS-in-JS

## 📁 Estructura del Proyecto

```
peritos-kit/
├── public/
│   ├── img/
│   │   ├── perito.png      # Evidencias reales
│   │   └── perito2.png
│   ├── video/
│   │   └── videoP.mp4      # Video de evidencia
│   ├── pdf/
│   │   └── perito.pdf      # Informe PDF
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── Login.jsx                    # Autenticación
│   │   ├── Admin.jsx                    # Dashboard admin
│   │   ├── Perito.jsx                   # Dashboard perito
│   │   ├── Clientes.Admin.jsx           # Gestión clientes
│   │   ├── detalleCliente.jsx           # Detalle cliente
│   │   ├── HistorialCliente.jsx         # Historial cliente
│   │   ├── Requerimientos.jsx           # Lista requerimientos
│   │   ├── RequerimientoDetalleAdminPerito.jsx  # Detalle admin
│   │   ├── RequerimientoDetalle.jsx     # Detalle perito
│   │   ├── peritoEnCurso.jsx            # Vista móvil perito
│   │   ├── CrearRequerimiento.jsx       # Crear requerimiento
│   │   ├── NuevoCliente.jsx             # Crear cliente
│   │   ├── AgregarPerito.jsx            # Crear perito
│   │   ├── MobileMenu.jsx               # Menú móvil
│   │   └── img/
│   │       ├── logo.png
│   │       └── perito.jpg
│   ├── hooks/
│   │   └── useResponsive.js             # Hook responsive
│   ├── data.js                          # Datos y modelos
│   ├── App.jsx                          # Componente principal
│   ├── main.jsx                         # Punto de entrada
│   └── styles.css                       # Estilos globales
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone [url-del-repositorio]
cd peritos-kit
   ```

2. **Instalar dependencias**
   ```bash
npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Construir para producción
npm run preview      # Vista previa de producción
```

## 📱 Responsive Design

La aplicación está completamente optimizada para dispositivos móviles:

- **Breakpoint**: 768px
- **Menú hamburguesa** en móviles
- **Tamaños adaptativos** de imágenes y videos
- **Navegación táctil** optimizada
- **Formularios** adaptados a pantallas pequeñas

## 🎨 Características de UI/UX

### Diseño
- **Interfaz moderna** y profesional
- **Colores corporativos** azul y verde
- **Iconografía consistente** con emojis y iconos
- **Animaciones suaves** en hover y transiciones
- **Cards clickeables** con efectos visuales

### Experiencia de Usuario
- **Navegación intuitiva** con breadcrumbs
- **Feedback visual** en todas las acciones
- **Confirmaciones** para acciones destructivas
- **Estados de carga** y mensajes informativos
- **Accesibilidad** con alt texts y labels

## 📊 Datos de Ejemplo

El sistema incluye datos de prueba predefinidos:

### Clientes
- **Reisac** (ID: 1234526789) - Asignado a Juan Pérez
- **Inmobiliaria Quito** (ID: 2654556565) - Asignado a María Gómez
- **Alfa Properties** (ID: 3316554165) - Asignado a Carlos Ruiz

### Peritos
- **Juan Pérez** (perito1) - Disponible
- **María Gómez** (perito2) - No disponible
- **Carlos Ruiz** (perito3) - Disponible
- **Ana Torres** (perito4) - Disponible

### Requerimientos
- **Requerimiento 101**: Reisac - Juan Pérez (Asignado)
- **Requerimiento 102**: Inmobiliaria Quito - María Gómez (En Proceso)
- **Requerimiento 103**: Alfa Properties - Carlos Ruiz (Finalizado con evidencias)

## 🔄 Flujos de Trabajo

### Flujo Administrador
1. **Login** como administrador
2. **Gestionar clientes** (crear, editar, ver historial)
3. **Crear requerimientos** y asignar peritos
4. **Monitorear progreso** de tareas
5. **Revisar evidencias** de requerimientos finalizados
6. **Reasignar** si es necesario

### Flujo Perito
1. **Login** como perito
2. **Ver requerimientos asignados**
3. **Cambiar estado** a "En Proceso"
4. **Subir evidencias** (fotos, video, PDF)
5. **Agregar observaciones**
6. **Marcar como "Finalizado"**

## 🎯 Casos de Uso

### Para Empresas Inmobiliarias
- **Gestión centralizada** de inspecciones
- **Control de calidad** con evidencias
- **Seguimiento de tiempos** y plazos
- **Historial completo** de trabajos

### Para Peritos
- **Organización de tareas** diarias
- **Documentación profesional** del trabajo
- **Comunicación** con administración
- **Acceso móvil** para trabajo en campo

## 🔧 Personalización

### Agregar Nuevos Peritos
1. Ir a "Agregar Perito" desde el dashboard admin
2. Completar formulario con datos del perito
3. El sistema asignará automáticamente un ID único

### Crear Requerimientos
1. Ir a "Crear Requerimiento"
2. Seleccionar cliente y perito
3. Definir dirección, plazo y tiempo estimado
4. El sistema creará el requerimiento automáticamente

### Modificar Datos
- Los datos se almacenan en `src/data.js`
- Se pueden modificar clientes, peritos y requerimientos
- Los cambios se reflejan inmediatamente en la interfaz

## 🚀 Próximas Mejoras

### Funcionalidades Planificadas
- **Base de datos real** (reemplazar data.js)
- **Autenticación JWT** más robusta
- **Notificaciones push** para móviles
- **Reportes y estadísticas** avanzadas
- **Integración con mapas** más detallada
- **Sistema de calificaciones** para peritos
- **Chat interno** entre admin y peritos

### Mejoras Técnicas
- **PWA** (Progressive Web App)
- **Offline support** para peritos en campo
- **Optimización de imágenes** automática
- **Backup automático** de evidencias
- **API REST** para integraciones

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto:

- **Documentación**: Este README
- **Issues**: Reportar en el repositorio
- **Desarrollo**: Contactar al equipo de desarrollo

## 📄 Licencia

Este proyecto es de uso interno y está diseñado específicamente para la gestión de peritos inmobiliarios.

---

**Desarrollado con ❤️ para optimizar la gestión de peritos inmobiliarios**