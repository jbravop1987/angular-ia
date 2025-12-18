# Angular IA v3 - Enterprise SaaS Application

Aplicación Angular 18+ moderna con arquitectura enterprise, construida con las últimas características de Angular.

## 🚀 Características

- **Angular 18+** con Standalone Components
- **Zoneless** (sin zone.js) para mejor rendimiento
- **Signals** para gestión de estado reactivo
- **Control Flow** moderno (@if, @for)
- **TailwindCSS** para estilos
- **FontAwesome 6** vía CDN
- **Arquitectura limpia** y escalable
- **Totalmente responsive** (móvil, tablet, desktop)

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── core/                 # Servicios, guards, interceptors
│   ├── features/             # Módulos de características
│   │   ├── auth/            # Login
│   │   ├── dashboard/       # Dashboard principal
│   │   └── users/           # Gestión de usuarios
│   ├── layout/              # Componentes de layout
│   │   ├── components/
│   │   │   ├── sidebar/
│   │   │   └── header/
│   │   └── main-layout/
│   ├── shared/              # Componentes compartidos
│   │   ├── components/
│   │   │   ├── toast/
│   │   │   └── spinner/
│   │   └── services/
│   ├── app.routes.ts
│   └── app.config.ts
├── environments/
└── styles.css
```

## 🔐 Login

Credenciales de prueba:
- Email: `admin@example.com`
- Password: `123456`

O cualquier email/password válido para desarrollo local.

## 🎨 Tecnologías

- Angular 18+
- TypeScript 5.5
- TailwindCSS 3.4
- RxJS 7.8
- FontAwesome 6

## 📝 Características Principales

### Autenticación
- Login con validación de formularios
- Guard para rutas protegidas
- Interceptor HTTP para tokens
- Fallback local para desarrollo

### Dashboard
- Estadísticas en tiempo real
- Actividad reciente
- Acciones rápidas
- Diseño corporate moderno

### Gestión de Usuarios
- Lista de usuarios con búsqueda
- Crear/Editar/Eliminar usuarios
- Modal de edición
- Vista responsive

### Componentes Globales
- Toast notifications
- Spinner de carga
- Sidebar colapsable
- Header con perfil de usuario

## 🚀 Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/`

## 📄 Licencia

MIT
