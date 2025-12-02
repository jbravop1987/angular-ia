# Angular Enterprise SaaS Application

## 🚀 Características

- **Angular 18+** con arquitectura Zoneless
- **Standalone Components** sin módulos
- **Signals API** para gestión de estado reactivo
- **Control Flow** moderno (@if, @for)
- **Tailwind CSS** + **FontAwesome 6** para UI
- **Lazy Loading** en todas las rutas
- **Autenticación** con Guards e Interceptors
- **Diseño Responsive** Corporate SaaS

## 📁 Estructura del Proyecto

\`\`\`
src/
├── environments/           # Variables de entorno
├── app/
│   ├── core/              # Servicios, Guards, Interceptors
│   ├── features/          # Módulos de funcionalidad
│   │   ├── auth/          # Login
│   │   ├── dashboard/     # Dashboard principal
│   │   └── users/         # Gestión de usuarios
│   └── layout/            # Componentes de layout
│       ├── components/    # Sidebar, Header
│       └── main-layout/   # Layout principal
\`\`\`

## 🛠️ Instalación

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Build para producción
npm run build
\`\`\`

## 🔐 Credenciales de Demo

- **Email:** admin@empresa.com
- **Password:** admin123

## 🎨 Tecnologías Utilizadas

- Angular 18+ (Zoneless)
- TypeScript 5.4+
- Tailwind CSS 3.4+
- FontAwesome 6
- RxJS 7.8+

## 📝 Características Técnicas

### Zoneless Architecture
La aplicación utiliza `provideExperimentalZonelessChangeDetection()` eliminando la dependencia de Zone.js para mejor rendimiento.

### Signals
Toda la gestión de estado reactivo utiliza la API de Signals de Angular para un código más limpio y eficiente.

### Lazy Loading
Todas las rutas implementan lazy loading para optimizar el tiempo de carga inicial.

### Variables de Entorno
Las URLs de API y configuraciones están centralizadas en `src/environments/environment.ts`.

## 🎯 Funcionalidades

- ✅ Sistema de autenticación con fallback
- ✅ Dashboard con métricas y estadísticas
- ✅ Gestión de usuarios (CRUD)
- ✅ Sidebar colapsable
- ✅ Header con menú de usuario
- ✅ Búsqueda y filtros
- ✅ Diseño responsive

## 📄 Licencia

© 2025 Enterprise SaaS - v1.0.0
