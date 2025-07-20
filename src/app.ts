import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import helmet from 'helmet';
import expenseRoutes from './routes/expenseRoutes';
import { errorHandler } from './midddleware/errorMiddleware';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.use(errorHandler);

export default app;
