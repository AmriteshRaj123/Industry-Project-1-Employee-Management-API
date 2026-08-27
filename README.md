# Employee Management System (MERN)

A full-stack Employee Management System built with **MongoDB, Express.js, React, and Node.js**. HR/Admin can add, view, update, delete, search, and filter employees through a REST API and a React dashboard.

> Industry Project 1 — Placement-focused bootcamp project. See [PRD.md](./PRD.md) for full requirements and interview questions.

**Live demo**
- Frontend: `https://<your-app>.vercel.app`
- Backend: `https://<your-api>.onrender.com/api/v1/health`

---

## Features

- Add / register employee with auto-generated `EMP001` style ID
- View all employees with pagination and sorting
- View employee by ID
- Update employee (full `PUT` and partial `PATCH`)
- Delete employee with confirmation
- Search by name, email, or employee ID
- Filter by department and status
- Server-side validation with field-level error messages
- Centralized error handling with consistent response format
- Postman collection with success and failure cases

## Tech stack

| Layer | Tech |
|---|---|
| Database | MongoDB Atlas, Mongoose |
| Backend | Node.js 20, Express.js 4, express-validator, dotenv, cors, helmet, morgan |
| Frontend | React 18, Vite, React Router v6, Axios, react-hot-toast |
| Tooling | nodemon, ESLint, Prettier, Postman |

---

## Folder structure

```
employee-management-system/
│
├── README.md
├── PRD.md
├── .gitignore
├── .prettierrc
├── package.json                          # root scripts: run client + server together
│
├── postman/
│   ├── Employee-Management-API.postman_collection.json
│   └── Employee-Management.postman_environment.json
│
├── server/                               # ---------- BACKEND (Node + Express) ----------
│   ├── package.json
│   ├── .env                              # never commit
│   ├── .env.example
│   ├── .eslintrc.json
│   │
│   └── src/
│       ├── index.js                      # entry point: loads env, connects DB, starts server
│       ├── app.js                        # creates express app, registers middleware + routes
│       │
│       ├── config/
│       │   ├── db.js                     # mongoose.connect() with retry + logs
│       │   └── env.js                    # reads and validates process.env, exports config object
│       │
│       ├── constants/
│       │   ├── departments.js            # allowed department enum
│       │   ├── httpStatus.js             # named status codes (OK, CREATED, NOT_FOUND ...)
│       │   └── messages.js               # reusable response messages
│       │
│       ├── models/
│       │   └── employee.model.js         # Mongoose schema, indexes, pre-save hook for employeeId
│       │
│       ├── validations/
│       │   └── employee.validation.js    # express-validator chains for create / update / query
│       │
│       ├── middlewares/
│       │   ├── validate.js               # runs validation chains, throws ApiError(400) on failure
│       │   ├── validateObjectId.js       # checks :id is a valid Mongo ObjectId
│       │   ├── errorHandler.js           # global error handler (last middleware)
│       │   ├── notFound.js               # 404 for unknown routes
│       │   └── requestLogger.js          # morgan config
│       │
│       ├── controllers/
│       │   └── employee.controller.js    # reads req, calls service, sends res — no DB logic here
│       │
│       ├── services/
│       │   └── employee.service.js       # business logic + DB queries (search, filter, paginate)
│       │
│       ├── routes/
│       │   ├── index.js                  # mounts /health and /employees under /api/v1
│       │   ├── health.routes.js
│       │   └── employee.routes.js        # maps HTTP method + path → validation → controller
│       │
│       ├── utils/
│       │   ├── ApiError.js               # custom Error with statusCode + errors[]
│       │   ├── ApiResponse.js            # { success, message, data, pagination }
│       │   ├── asyncHandler.js           # wraps async controllers, forwards errors to next()
│       │   ├── generateEmployeeId.js     # EMP001, EMP002 ...
│       │   └── buildQuery.js             # converts req.query → mongoose filter/sort/skip/limit
│       │
│       └── seeds/
│           └── seedEmployees.js          # optional: inserts sample data for demo
│
└── client/                               # ---------- FRONTEND (React + Vite) ----------
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── .env                              # never commit
    ├── .env.example
    ├── .eslintrc.cjs
    │
    ├── public/
    │   └── favicon.svg
    │
    └── src/
        ├── main.jsx                      # ReactDOM.createRoot, wraps App with Router + Toaster
        ├── App.jsx                       # renders Layout + AppRoutes
        │
        ├── routes/
        │   └── AppRoutes.jsx             # all <Route> definitions
        │
        ├── api/
        │   ├── axios.js                  # axios instance with baseURL + response interceptor
        │   └── employee.api.js           # getEmployees, getEmployee, createEmployee, updateEmployee, patchEmployee, deleteEmployee, getDepartments
        │
        ├── pages/
        │   ├── EmployeeListPage.jsx      # search + filter + table + pagination
        │   ├── EmployeeDetailPage.jsx
        │   ├── AddEmployeePage.jsx
        │   ├── EditEmployeePage.jsx
        │   └── NotFoundPage.jsx
        │
        ├── components/
        │   ├── layout/
        │   │   ├── Layout.jsx            # Navbar + <Outlet/>
        │   │   └── Navbar.jsx
        │   │
        │   ├── employee/
        │   │   ├── EmployeeTable.jsx
        │   │   ├── EmployeeRow.jsx
        │   │   ├── EmployeeForm.jsx      # shared by Add and Edit pages
        │   │   ├── EmployeeCard.jsx      # mobile view
        │   │   ├── SearchBar.jsx
        │   │   ├── DepartmentFilter.jsx
        │   │   ├── StatusBadge.jsx
        │   │   └── DeleteConfirmModal.jsx
        │   │
        │   └── common/
        │       ├── Button.jsx
        │       ├── Input.jsx
        │       ├── Select.jsx
        │       ├── Loader.jsx
        │       ├── ErrorMessage.jsx
        │       ├── EmptyState.jsx
        │       └── Pagination.jsx
        │
        ├── hooks/
        │   ├── useEmployees.js           # fetch list with search/filter/page state
        │   ├── useEmployee.js            # fetch single by id
        │   └── useDebounce.js
        │
        ├── utils/
        │   ├── formatDate.js
        │   ├── formatCurrency.js         # ₹ formatting
        │   └── mapApiErrors.js           # errors[] → { field: message }
        │
        ├── constants/
        │   ├── departments.js
        │   └── routes.js                 # path constants
        │
        └── styles/
            ├── index.css                 # global reset + variables
            └── components.css
```

### Why this structure

| Layer | Responsibility | Never does |
|---|---|---|
| `routes/` | Map URL + method to middleware chain | DB queries, business logic |
| `validations/` | Declare input rules | Send responses |
| `middlewares/` | Cross-cutting concerns (validate, log, errors) | Feature logic |
| `controllers/` | Read `req`, call service, send `res` | Talk to Mongoose directly |
| `services/` | Business logic, DB queries | Know about `req` / `res` |
| `models/` | Schema, indexes, hooks | Anything else |
| `utils/` | Small reusable helpers | Hold state |

Request flow: `routes → validation middleware → controller → service → model → (back up) → ApiResponse`
Error flow: `anywhere → throw ApiError → asyncHandler → next(err) → errorHandler`

---

## Getting started

### Prerequisites
- Node.js 20+
- npm 10+
- MongoDB Atlas account (or local MongoDB)
- Postman

### 1. Clone

```bash
git clone https://github.com/<your-username>/employee-management-system.git
cd employee-management-system
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

`server/.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/employee_db
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

Server runs at `http://localhost:5000`. Check `http://localhost:5000/api/v1/health`.

### 3. Frontend setup

```bash
cd ../client
npm install
cp .env.example .env
```

`client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

```bash
npm run dev
```

App runs at `http://localhost:5173`.

### 4. Run both together (optional)

From the root:

```bash
npm install
npm run dev
```

Root `package.json` uses `concurrently` to start client and server.

### 5. Seed sample data (optional)

```bash
cd server
npm run seed
```

---

## Scripts

### server

| Script | Command | Purpose |
|---|---|---|
| `dev` | `nodemon src/index.js` | Dev server with auto-reload |
| `start` | `node src/index.js` | Production |
| `seed` | `node src/seeds/seedEmployees.js` | Insert sample employees |
| `lint` | `eslint src` | Lint |

### client

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Dev server |
| `build` | `vite build` | Production build to `dist/` |
| `preview` | `vite preview` | Preview build locally |
| `lint` | `eslint src` | Lint |

---

## API reference

Base URL: `http://localhost:5000/api/v1`

| Method | Endpoint | Description | Success |
|---|---|---|---|
| GET | `/health` | Health check | 200 |
| POST | `/employees` | Add employee | 201 |
| GET | `/employees` | List (search, filter, paginate, sort) | 200 |
| GET | `/employees/departments` | Allowed departments | 200 |
| GET | `/employees/:id` | Get by ID | 200 |
| PUT | `/employees/:id` | Full update | 200 |
| PATCH | `/employees/:id` | Partial update | 200 |
| DELETE | `/employees/:id` | Delete | 200 |

### Query params — `GET /employees`

| Param | Example | Notes |
|---|---|---|
| `search` | `?search=rahul` | Matches firstName, lastName, email, employeeId (case-insensitive) |
| `department` | `?department=Sales` | Must be an allowed department |
| `status` | `?status=active` | `active` or `inactive` |
| `page` | `?page=2` | Default 1 |
| `limit` | `?limit=20` | Default 10, max 100 |
| `sort` | `?sort=-salary` | Prefix `-` for descending. Default `-createdAt` |

Combine freely: `/employees?search=sharma&department=Engineering&page=1&limit=5&sort=-dateOfJoining`

### Sample request — create

```http
POST /api/v1/employees
Content-Type: application/json

{
  "firstName": "Rahul",
  "lastName": "Sharma",
  "email": "rahul.sharma@company.com",
  "phone": "9876543210",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": 850000,
  "dateOfJoining": "2024-06-15",
  "address": { "city": "Lucknow", "state": "Uttar Pradesh", "pincode": "226001" }
}
```

### Sample response — 201

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "665f1c2e8b3a4d001f9e1a2b",
    "employeeId": "EMP001",
    "firstName": "Rahul",
    "lastName": "Sharma",
    "email": "rahul.sharma@company.com",
    "phone": "9876543210",
    "department": "Engineering",
    "designation": "Software Engineer",
    "salary": 850000,
    "dateOfJoining": "2024-06-15T00:00:00.000Z",
    "status": "active",
    "address": { "city": "Lucknow", "state": "Uttar Pradesh", "pincode": "226001" },
    "createdAt": "2025-01-10T09:12:44.120Z",
    "updatedAt": "2025-01-10T09:12:44.120Z"
  }
}
```

### Sample response — 400 validation error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email" },
    { "field": "phone", "message": "Phone must be a 10-digit number" }
  ]
}
```

### Sample response — list

```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": [ ],
  "pagination": { "total": 42, "page": 1, "limit": 10, "totalPages": 5 }
}
```

### Status codes

| Code | Meaning in this API |
|---|---|
| 200 | OK — read, update, delete succeeded |
| 201 | Created — employee added |
| 400 | Bad request — validation failed or invalid ID / query |
| 404 | Employee or route not found |
| 409 | Conflict — email already exists |
| 500 | Server error |

### Validation rules

| Field | Rule |
|---|---|
| firstName, lastName | required, 2–50 chars |
| email | required, valid, unique |
| phone | required, 10 digits |
| department | required, one of: Engineering, Sales, Marketing, HR, Finance, Operations, Support |
| designation | required, 2–50 chars |
| salary | required, number ≥ 0 |
| dateOfJoining | required, valid date, not in future |
| status | optional, `active` / `inactive` (default `active`) |
| address.pincode | optional, 6 digits |

---

## Postman testing

1. Open Postman → Import → select `postman/Employee-Management-API.postman_collection.json`.
2. Import `postman/Employee-Management.postman_environment.json` and select it.
3. Set `baseUrl` to `http://localhost:5000/api/v1` (or your deployed URL).
4. Run requests folder by folder. Each folder has success and failure cases:

```
Employee Management API
├── Health
│   └── GET health
├── Create
│   ├── Create employee — success (201)
│   ├── Create employee — missing fields (400)
│   └── Create employee — duplicate email (409)
├── Read
│   ├── Get all employees (200)
│   ├── Get with search + filter (200)
│   ├── Get by ID — success (200)
│   ├── Get by ID — invalid ID (400)
│   └── Get by ID — not found (404)
├── Update
│   ├── PUT — success (200)
│   ├── PUT — validation error (400)
│   ├── PATCH — success (200)
│   └── PATCH — not found (404)
└── Delete
    ├── Delete — success (200)
    └── Delete — not found (404)
```

Tip: add a Postman test script on "Create — success" to save `_id` into `{{employeeId}}` so later requests reuse it.

---

## Deployment

| Part | Platform | Steps |
|---|---|---|
| Database | MongoDB Atlas | Create free cluster → create DB user → allow `0.0.0.0/0` → copy URI |
| Backend | Render / Railway | New Web Service → root `server` → build `npm install` → start `npm start` → add env vars |
| Frontend | Vercel / Netlify | Import repo → root `client` → build `npm run build` → output `dist` → set `VITE_API_BASE_URL` |

After deploying backend, update `CLIENT_URL` on the server to the Vercel URL so CORS allows it.

> Free tiers sleep after inactivity — the first request may take 30–50 seconds.

---

## Placement prep

Key interview questions covered by this project, with model answers, are in [PRD.md → Section 13](./PRD.md#13-placement-focus--interview-questions-with-model-answers):

REST API · Middleware · GET vs POST · PUT vs PATCH · HTTP status codes · Request vs Response · Node.js vs Express.js · CRUD

Be ready to open the exact file in your repo when asked each question.

---

## Author

**Your Name** — MERN Stack Developer
GitHub: `@your-handle` · LinkedIn: `your-profile`
