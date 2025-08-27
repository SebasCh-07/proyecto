# Análisis para Excel de Plataforma Peritos

| Característica de la Pantalla | Complejidad Estimada | Tiempo de Desarrollo (horas) | Notas del Desarrollador |
|-------------------------------|---------------------|------------------------------|--------------------------|
| Login/Registro | MEDIA | 10 | Sistema de autenticación completo con dos roles (Admin/Perito) y localStorage para persistencia de sesión |
| Onboarding Peritos | ALTA | 16 | Proceso de registro y verificación de peritos con validación y flujo de usuario |
| Onboarding Clientes | ALTA | 16 | Registro de clientes con validación de datos y asignación de peritos |
| Dashboard Peritos | ALTA | 34 | Panel principal para peritos que muestra requerimientos asignados, incluye estados y cronómetros de plazos |
| Dashboard Clientes | ALTA | 34 | Panel principal para clientes con seguimiento de solicitudes de avalúos |
| Dashboard Admin | MEDIA | 34 | Panel de administración con gestión de peritos y clientes, asignación de requerimientos |
| Perfil Perito | ALTA | 24 | Gestión completa de perfiles de peritos con estados de disponibilidad |
| Perfil Cliente | ALTA | 24 | Perfiles de clientes con datos de contacto e historial |
| Edición de Perfiles | MEDIA | 16 | Sistema de edición de perfiles con validaciones |
| Crear Requerimientos | ALTA | 24 | Sistema de creación de requerimientos de avalúos con datos de ubicación y plazos |
| Asignaciones | ALTA | 36 | Sistema de asignación de requerimientos a peritos disponibles |
| Gestión de Servicios | MEDIA | 40 | Administración de servicios de avalúo con seguimiento de estados |
| Calificaciones | MEDIA | 20 | Sistema de evaluación de peritos con ratings |
| Gestión de Peritos | MEDIA | 36 | Panel de administración específico para peritos con estados y disponibilidad |
| Gestión de Requerimientos | MEDIA | 40 | Administración de requerimientos con filtros por estado y asignación |
| Entrevistas | BAJA | 30 | Sistema de entrevistas y seguimiento de peritos |
| Modales del Sistema | MEDIA | 36 | Conjunto de modales para acciones como asignación, finalización y visualización de detalles |
| Componentes Reutilizables | BAJA | 24 | Componentes UI como tarjetas de requerimientos, badges de estado y cronómetros |
| Sistema de Notificaciones | BAJA | 40 | Sistema de notificaciones para plazos y cambios de estado |
| Email Integration | BAJA | 25 | Integración con servicio de correo para notificaciones |
| WhatsApp Integration | BAJA | 24 | Integración con WhatsApp para alertas de asignaciones |
| Diseño de BD | ALTA | 24 | Modelado de datos con relaciones entre peritos, clientes y requerimientos |
| APIs REST | ALTA | 96 | Desarrollo de endpoints para toda la funcionalidad del sistema |
| Autenticación | ALTA | 30 | Sistema de autenticación seguro con tokens |
| Testing | MEDIA | 40 | Pruebas de UI y funcionalidad |
| Deployment | MEDIA | 16 | Configuración de despliegue con Vite |

## Notas adicionales:
1. La aplicación actualmente funciona con estado local y localStorage para simular persistencia.
2. La estructura incluye modelos de datos para Clientes, Peritos y Requerimientos.
3. El sistema implementa funcionalidad para:
   - Gestión de peritos (agregar, asignar, historial)
   - Gestión de clientes (agregar, ver detalles, historial)
   - Gestión de requerimientos (asignar, ver estado, finalizar)
   - Cronómetros para seguimiento de plazos de entrega
   - Subida de evidencias (fotos, videos, informes de avalúo)
4. La interfaz es responsive y se adapta a dispositivos móviles.
5. El sistema permite a los peritos registrar su llegada con GPS, controlar tiempo en sitio, y subir evidencias fotográficas y documentales.
