import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import helmet from 'helmet';
import expenseRoutes from './routes/expenseRoutes.js';
import { errorHandler } from './midddleware/errorMiddleware.js';
import { authenticate } from './midddleware/authMiddleware.js';

dotenv.config();

const allowedOrigins = process.env.CORS_ORIGIN

const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses',authenticate, expenseRoutes);

app.use(errorHandler);

export default app;
