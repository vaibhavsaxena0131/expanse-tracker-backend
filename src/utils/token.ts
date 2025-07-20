import jwt, { Secret, SignOptions } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  role?: string;
}

export const generateToken = (
  payload: TokenPayload,
  secret: string | Secret, // <-- Accept both string and Secret
  expiresIn: SignOptions['expiresIn']
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};