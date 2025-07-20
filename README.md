# 🧾 Expense Tracker Backend

A simple expense tracking backend built with **Node.js + Express + TypeScript + Prisma + PostgreSQL**.  
Designed with professional folder structure, authentication, role-based access, and seed data.

---

## ✅ Features
- JWT authentication (mock login)
- Role-based access (Admin, Employee)
- REST APIs:
  - Login
  - Submit expense
  - View expenses (filter by user, date, category)
  - Approve/reject expenses (Admin)
  - Get analytics by category
- Input validation & error handling
- Seed script for demo users & expenses
- PostgreSQL + Prisma ORM

---

## 📦 Project Structure

```

prisma/              → Prisma schema & seed script
src/
├── controllers/    → Route handlers
├── services/       → Business logic
├── routes/         → Express routers
├── middleware/     → Auth & role middlewares
├── utils/          → Helpers (validation etc.)
├── app.ts          → Express app
└── server.ts       → Start server

````

---

## ⚙️ Setup & Run

1️⃣ Install dependencies:
```bash
npm install
````

2️⃣ Apply migrations & generate Prisma client:

```bash
npx prisma migrate dev --name init
```

3️⃣ Seed database with test data:

```bash
npm run seed
```

4️⃣ Run in development:

```bash
npm run dev
```

---

## 🚀 Test users

|     Role |                                   Email | Password |
| -------: | --------------------------------------: | -------: |
|    Admin | [admin@test.com](mailto:admin@test.com) | password |
| Employee |   [user@test.com](mailto:user@test.com) | password |

---

## 🧪 API Endpoints

| Method |                   Endpoint |                    Description |
| -----: | -------------------------: | -----------------------------: |
|   POST |            /api/auth/login |             Login, returns JWT |
|   POST |              /api/expenses |      Submit expense (employee) |
|    GET |              /api/expenses |      View expenses (own/admin) |
|   POST | /api/expenses/\:id/approve | Approve/reject expense (admin) |
|    GET |    /api/expenses/analytics |   Expenses by category (admin) |

---

## 🛡 .env.example

```
DATABASE_URL=""
JWT_SECRET=""
PORT=5000
```

---

## ✏ Author

Built with ❤️ by Vaibhav

```
