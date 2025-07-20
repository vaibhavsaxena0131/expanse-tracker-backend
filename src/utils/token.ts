import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  role?: string; // optional, because refresh token doesn’t need it
}

/**
 * Generate JWT token
 * @param payload payload to include in the token
 * @param secret env secret
 * @param expiresIn time like '15m' or '7d'
 */
export const generateToken = (payload: TokenPayload, secret: string, expiresIn: string): string => {
  return jwt.sign(payload, secret, { expiresIn });
};
