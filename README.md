# Vue Frontend

Panel de gestión de Categorías y Productos. Consume la API REST del backend (Laravel).

## Metodología de desarrollo

El andamiaje del proyecto (estructura de carpetas, configuración de Vite, Tailwind y Axios) se generó con asistencia de IA, como apoyo para agilizar tareas repetitivas de configuración. La lógica de la aplicación —componentes, stores de Pinia, validaciones de formularios, manejo de estados y el interceptor de errores de Axios— fue implementada de forma manual.

## Requisitos previos

- Node.js 18 o superior
- npm
- El backend corriendo (ver `../backend/README.md`)

## Instalación

```bash
cd front
npm install
cp .env.example .env
npm run dev
```

El `.env` solo necesita apuntar a la URL del API:

```env
VITE_API_URL=http://localhost:8000/api
```

## URLs base

| Entorno | URL |
| ------- | --------------------- |
| Desarrollo (Vite) | `http://localhost:5173` |
| Build de producción | `npm run build` genera `dist/`, servible con cualquier servidor estático |

## Estructura del proyecto

```text
src/
├─ components/
│  ├─ ui/           # Spinner, ToastContainer, ConfirmModal
│  ├─ products/      # ProductForm, ProductTable
│  ├─ categories/    # CategoryForm, CategoryTable
│  └─ layout/        # AppNavbar
├─ views/            # DashboardView, ProductsListView, ProductFormView, CategoriesListView
├─ stores/           # products.js, categories.js (Pinia)
├─ router/           # index.js (Vue Router)
├─ services/         # api.js (instancia de Axios + interceptor)
└─ utils/            # toast.js (alertas), validators.js (validaciones de formularios)
```

## Manejo de estados y errores

- Cada store de Pinia expone `items`, `loading` y `error`, y las vistas usan esos estados para mostrar un spinner, el contenido o un mensaje de error.
- `services/api.js` tiene un interceptor global de Axios que detecta errores de red y respuestas 4xx/5xx, y dispara un toast con el mensaje correspondiente. Los errores 422 (validación) no disparan un toast genérico: se muestran por campo, directamente en el formulario.
- Antes de enviar cualquier formulario se valida en el cliente (`utils/validators.js`): nombre requerido, precio numérico mayor a 0, stock entero mayor o igual a 0, categoría requerida.
- Las acciones destructivas (eliminar categoría o producto) piden confirmación con un modal antes de ejecutarse.

## Docker

Este proyecto no incluye Docker; se levanta directamente con `npm run dev` apuntando al backend corriendo en local.
