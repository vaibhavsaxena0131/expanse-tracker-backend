import dotenv from 'dotenv';
dotenv.config();
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';


export const authenticateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

  const accessToken = generateToken(
  { id: user.id, role: user.role },
  process.env.JWT_ACCESS_SECRET as string,
  '15m'
);

const refreshToken = generateToken(
  { id: user.id },
  process.env.JWT_REFRESH_SECRET as string,
  '7d'
);

  return { accessToken, refreshToken, user: { id: user.id, name: user.name, role: user.role } };
};
