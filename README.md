<p align="center">
  <img src="frontend/public/workvion.png" alt="Workvion" height="80" />
</p>

<h1 align="center">Workvion</h1>

<p align="center">
  <b>Employee Leave & Attendance Management System</b><br/>
  A full-stack web application for managing employee leaves, attendance tracking, and workforce analytics.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens" />
</p>

---

## Project Overview

**Workvion** is a role-based employee management system with two roles — **Employee** and **Admin**.

### Employee Features
- Mark daily attendance (present / absent)
- Apply for leaves (6 types: Casual, Sick, Earned, Maternity, Paternity, Unpaid)
- View leave history with status filters & pagination
- Monthly attendance report with calendar view & statistics
- In-app notification bell for real-time updates

### Admin Features
- Dashboard with workforce statistics (total employees, pending leaves, attendance records)
- Approve or reject employee leave requests
- View all attendance records with employee & date filters
- Full employee management — create, edit, delete users
- Monthly attendance reports across all employees

---

## Tech Stack & Justification

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 19 | Component-based UI with hooks for state management |
| **Build Tool** | Vite 6 | Lightning-fast HMR and optimized production builds |
| **Styling** | Tailwind CSS 4 | Utility-first CSS with zero runtime overhead via Vite plugin |
| **Routing** | React Router 7 | Declarative client-side routing with protected routes |
| **HTTP Client** | Axios | Promise-based HTTP with interceptors for auth headers |
| **Backend** | Express 5 | Minimal, fast Node.js framework for REST APIs |
| **Database** | MongoDB Atlas + Mongoose 9 | Flexible document model, great for varied leave/attendance schemas |
| **Auth** | JWT + bcryptjs | Stateless authentication; passwords hashed with 12-round salt |
| **Email** | Brevo Email API | Reliable transactional email delivery over HTTPS |
| **Notifications** | react-hot-toast | Lightweight toast notifications for user feedback |
| **Icons** | react-icons (Hi2) | Heroicons v2 — modern, consistent icon set |
| **Dates** | date-fns | Tree-shakeable date utility library |

---

## Project Structure

```
Workvion/
├── backend/
│   ├── .env                    # Environment variables
│   ├── seed.js                 # Seeds the initial admin user
│   ├── package.json
│   └── src/
│       ├── server.js           # Entry point – starts Express
│       ├── app.js              # Express app configuration
│       ├── config/
│       │   └── db.js           # MongoDB connection
│       ├── models/
│       │   ├── User.js         # User schema (employee/admin)
│       │   ├── Leave.js        # Leave request schema
│       │   └── Attendance.js   # Attendance record schema
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── userController.js
│       │   ├── leaveController.js
│       │   └── attendanceController.js
│       ├── middleware/
│       │   ├── auth.js         # JWT verification
│       │   ├── role.js         # Role-based access control
│       │   └── error.js        # Global error handler
│       └── routes/
│           ├── authRoutes.js
│           ├── userRoutes.js
│           ├── leaveRoutes.js
│           └── attendanceRoutes.js
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx            # React entry point
        ├── App.jsx             # Root component with routing
        ├── index.css           # Tailwind v4 imports + theme
        ├── components/         # Reusable UI components
        ├── layouts/            # Sidebar, AppLayout
        ├── pages/              # Employee & Admin pages
        ├── context/            # AuthContext, NotificationContext
        ├── services/           # Axios API layer
        ├── utils/              # Helper functions
        └── data/               # Shared constants
```

---

## Installation Steps

### Prerequisites
- **Node.js** v18+ and **npm**
- **MongoDB Atlas** account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Workvion
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see [Environment Variables](#environment-variables) below).

Seed the admin user:
```bash
npm run seed
```

Start the server:
```bash
npm run dev     # Development (with auto-reload)
npm start       # Production
```

The API will run on the port specified in your `.env` file.

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory with `VITE_API_URL` pointing to your backend API.

Start the dev server:
```bash
npm run dev
```

The app will open on the default Vite dev server port.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | Token expiration duration |
| `NODE_ENV` | Environment mode |
| `ADMIN_NAME` | Seeded admin's full name |
| `ADMIN_EMAIL` | Seeded admin's email |
| `ADMIN_PASSWORD` | Seeded admin's password |
| `BREVO_API_KEY` | Brevo transactional email API key |
| `BREVO_SENDER_EMAIL` | Verified Brevo sender email address |
| `BREVO_SENDER_NAME` | Sender name shown in emails |
| `EMAIL_TIMEOUT_MS` | Email API request timeout in milliseconds |

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

---

## API Endpoints

Base URL: `/api`

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | API status check |

### Authentication (`/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | No | Create a new account |
| `POST` | `/auth/login` | No | Sign in & get JWT |
| `GET` | `/auth/profile` | JWT | Get logged-in user info |

### Leaves (`/leaves`)

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `POST` | `/leaves` | Employee | Apply for leave |
| `GET` | `/leaves/my` | Employee | Get own leaves (paginated, filterable by status) |
| `PUT` | `/leaves/:id` | Employee | Edit a pending leave |
| `DELETE` | `/leaves/:id` | Employee | Cancel a pending leave |
| `GET` | `/leaves/all` | Admin | Get all leaves (paginated, filterable) |
| `PATCH` | `/leaves/:id/approve` | Admin | Approve a pending leave |
| `PATCH` | `/leaves/:id/reject` | Admin | Reject a pending leave |

### Attendance (`/attendance`)

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `POST` | `/attendance` | Employee | Mark attendance for a date |
| `GET` | `/attendance/my` | Employee | Get own records (paginated, date-range filter) |
| `GET` | `/attendance/all` | Admin | Get all records (paginated, user & date filters) |

### Users (`/users`) — Admin only

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | List all users (paginated) |
| `GET` | `/users/:id` | Get a single user |
| `PUT` | `/users/:id` | Update user details |
| `DELETE` | `/users/:id` | Delete user & all related data |

> All protected routes require the `Authorization: Bearer <token>` header.

---

## Database Models

### User
| Field | Type | Description |
|-------|------|-------------|
| `fullName` | String | Employee's full name |
| `email` | String | Unique, lowercase email |
| `password` | String | Hashed (bcrypt, 12 rounds), hidden by default |
| `role` | String | `"employee"` or `"admin"` |
| `dateOfJoining` | Date | Defaults to creation date |
| `leaveBalance` | Number | Remaining leave days (default: 20) |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

### Leave
| Field | Type | Description |
|-------|------|-------------|
| `userId` | ObjectId → User | The employee who applied |
| `leaveType` | String | One of 6 types (Casual, Sick, Earned, Maternity, Paternity, Unpaid) |
| `startDate` | Date | Leave start |
| `endDate` | Date | Leave end |
| `totalDays` | Number | Calculated duration |
| `status` | String | `"pending"`, `"approved"`, or `"rejected"` |
| `reason` | String | Employee's reason |
| `appliedDate` | Date | When the leave was submitted |

### Attendance
| Field | Type | Description |
|-------|------|-------------|
| `userId` | ObjectId → User | The employee |
| `date` | Date | The attendance date |
| `status` | String | `"present"` or `"absent"` |

> **Unique constraint:** One attendance record per user per day (`userId + date` compound index).

### Relationships
```
User (1) ──── (N) Leave        → One user can have many leave requests
User (1) ──── (N) Attendance   → One user can have many attendance records
```

---

## UI Design

The entire frontend UI was **designed and built by me from scratch**. I drew inspiration from modern design platforms like **Dribbble** and **Awwwards** to create a clean, professional interface. I also used **Stitch AI** for generating and iterating on specific UI component ideas during the design exploration phase.

---

## AI Tools Declaration

| Tool | How It Was Used |
|------|----------------|
| **ChatGPT (OpenAI)** | Used to generate individual React component snippets (e.g., modals, form layouts, stat cards) which were then customized and integrated into the project. Also helped with brainstorming component structure and getting quick answers on Tailwind utility classes. |
| **Claude (Anthropic)** | Used occasionally for reviewing code logic, understanding complex async patterns, and getting suggestions on backend validation approaches. |
| **GitHub Copilot** | Used for resolving configuration issues — helped debug backend/frontend integration problems and environment variable wiring. |


> Components were sourced from different AI tools, adapted to fit the project's design system, and manually integrated. Backend architecture, API design, database modeling, and overall project assembly were done by me. AI tools were primarily used as productivity aids for individual pieces, not for end-to-end generation it was used by me in large amount still this was because i want to build this platform as much as possible.

---

## Bonus Features Implemented

| # | Bonus Feature | Status | Details |
|---|--------------|--------|----------|
| 1 | **Monthly Attendance Reports** | ✅ Implemented | Employee monthly report with calendar grid showing daily attendance status, present/absent/unmarked counts, and attendance percentage. Admin monthly report across all employees with aggregate statistics and per-employee breakdowns. |
| 2 | **Pagination & Filters** | ✅ Implemented | Backend `paginate()` helper with `page`/`limit`/`skip` query params (default: 10 per page). Date-range filters (`from`/`to`) on attendance endpoints. Status filter (`pending`/`approved`/`rejected`) on leave endpoints. `userId` filter for admin views. Frontend paginated Table component with previous/next controls. |
| 3 | **Email Notifications** | ✅ Implemented | Real email integration using **Brevo Email API** over HTTPS. OTP emails for registration and password reset. Leave approval/rejection notification emails sent to employees with leave details (type, dates, duration). |
---

## Known Limitations

- **No file uploads** — Leave requests don't support document attachments.
- **Client-side notifications** — Notifications are stored in React state only; they don't persist across sessions or devices.
- **No rate limiting** — API endpoints are not rate-limited (should be added for production).

---

## Time Spent

| Area | Approximate Time |
|------|-----------------|
| Backend (API, models, auth, middleware) | ~4 hours |
| Frontend (UI design, pages, components) | ~4 hours |
| Filters & Pagination (backend query logic + frontend controls) | ~1.5 hours |
| API Testing with Postman (all endpoints, edge cases) | ~1 hour |
| Refactoring & File Structuring (Vite, Tailwind v4, folder structure, comments) | ~2 hours |
| Deployment & Environment Configuration | ~1.5 hour |
| Documentation | ~30 minutes |
| **Total** | **~14.5 hours** |

---

<p align="center">
  Built with ❤️ by Ayush Kumar using React, Express, Node & MongoDB
</p>

