# Spendio 💰

Aplicación web de gestión de gastos personales. Permite registrar ingresos y gastos, visualizar estadísticas y mantener un control claro de las finanzas personales.

🔗 **[Ver demo en vivo](https://spendio-three.vercel.app)**

---

## Características

- Registro e inicio de sesión con autenticación JWT
- Registro de ingresos y gastos con categorías personalizadas
- Dashboard con resumen de balance, ingresos y gastos
- Gráfico de gastos por categoría y evolución mensual
- Filtros por fecha
- Edición y eliminación de transacciones
- Gestión de categorías personalizadas
- Modo oscuro
- Diseño responsive

---

## Tecnologías

**Frontend**
- React 18
- Vite
- Tailwind CSS
- Recharts
- Axios
- React Router DOM

**Backend**
- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt

**Deploy**
- Frontend: Vercel
- Backend + Base de datos: Railway

---

## Instalación local

### Requisitos
- Node.js 18+
- PostgreSQL

### Backend
```bash
cd backend
npm install
```

Creá un archivo `.env` basado en `.env.example`:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=spendio
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_jwt_secret
```
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Abrí `http://localhost:5173` en el browser.

---

## Estructura del proyecto
```
spendio/
├── backend/
│   └── src/
│       ├── config/       # Conexión a la base de datos
│       ├── controllers/  # Lógica de negocio
│       ├── middlewares/  # Autenticación JWT
│       ├── models/       # Queries SQL
│       └── routes/       # Definición de endpoints
└── frontend/
    └── src/
        ├── components/   # Componentes reutilizables
        ├── context/      # Estado global (Auth, Theme)
        ├── pages/        # Páginas de la app
        └── services/     # Llamadas a la API
```

---

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/transactions` | Listar transacciones |
| POST | `/api/transactions` | Crear transacción |
| PUT | `/api/transactions/:id` | Editar transacción |
| DELETE | `/api/transactions/:id` | Eliminar transacción |
| GET | `/api/categories` | Listar categorías |
| POST | `/api/categories` | Crear categoría |
| DELETE | `/api/categories/:id` | Eliminar categoría |
| GET | `/api/stats/by-category` | Estadísticas por categoría |
| GET | `/api/stats/monthly` | Estadísticas mensuales |

---

## Autor

**Luca Sanguinetti** — [@sanguinettiluca](https://github.com/sanguinettiluca)