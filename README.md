# 🧾 Expense Tracker Backend

A robust expense tracking backend built with **Node.js**, **Express**, **TypeScript**, **Prisma**, and **PostgreSQL**.  
Supports authentication, role-based access, expense management, and analytics for both employees and admins.

---

## 🚀 Features

- **JWT Authentication:** Secure login and protected routes
- **Role-Based Access:** Admin and Employee roles
- **Expense Management:** Submit, edit, delete, approve, and reject expenses
- **Filtering & Analytics:** Filter by category/date/user, analytics by category
- **Validation & Error Handling:** Input validation with Zod/Joi, centralized error middleware
- **Seed Data:** Demo users and expenses for quick start
- **Professional Structure:** Modular controllers, services, routes, and middleware

---

## 📦 Project Structure

```
prisma/              → Prisma schema & seed script
src/
├── controllers/     → Route handlers (business logic)
├── services/        → Service layer (DB logic)
├── routes/          → Express routers
├── middleware/      → Auth & role middlewares
├── utils/           → Helpers (validation, JWT, etc.)
├── app.ts           → Express app setup
└── server.ts        → Server entry point
```

---

## ⚙️ Setup & Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Apply migrations & generate Prisma client**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Seed database with demo data**
   ```bash
   npm run seed
   ```

4. **Run in development**
   ```bash
   npm run dev
   ```

---

## 👤 Demo Users

|   Role   |             Name         |           Email              |        Password         |
|:--------:|:-----------------------:|:----------------------------:|:----------------------:|
|  Admin   | Priya Sharma            | admin@company.com            | adminStrongPass123      |
| Employee | John Doe                | john.doe@company.com         | empOnePass456           |
| Employee | Anita Singh              | anita.singh@company.com      | empTwoPass789           |

---

## 🧪 API Endpoints

| Method | Endpoint                          | Description                          | Access    |
|--------|-----------------------------------|--------------------------------------|-----------|
| POST   | /api/auth/login                   | Login, returns JWT                   | Public    |
| POST   | /api/expenses                     | Submit expense                       | Employee  |
| GET    | /api/expenses                     | View own expenses                    | Employee  |
| PUT    | /api/expenses/:id                 | Edit expense (if pending)            | Employee  |
| DELETE | /api/expenses/:id                 | Delete expense (if pending)          | Employee  |
| GET    | /api/expenses/all                 | View all expenses                    | Admin     |
| POST   | /api/expenses/:id/status          | Approve/Reject expense               | Admin     |

---

## 🛡 Environment Variables (.env example)

```
DATABASE_URL=""
JWT_ACCESS_SECRET=""
JWT_REFRESH_SECRET=""
PORT=5000
```

---

## 📝 Notes

- **CORS:** Update allowed origins in `src/app.ts` for your frontend domains.
- **Passwords:** Demo passwords are for development only.
- **Seed Data:** See `src/prisma/seed.ts` for user and expense examples.

---

## ✏️ Author

Built with ❤️ by Vaibhav