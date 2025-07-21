import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import helmet from 'helmet';
import expenseRoutes from './routes/expenseRoutes.js';
import { errorHandler } from './midddleware/errorMiddleware.js';

dotenv.config();

const allowedOrigins = [
  'https://expanse-tracker-frontend-git-main-vaibhavs-projects-8838a755.vercel.app'
];

const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
//     next();
// });

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.use(errorHandler);

export default app;
