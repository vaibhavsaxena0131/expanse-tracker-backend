import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log('Authenticating request...', req.headers, req.cookies);

  // Try to get tokens from cookies first, then headers
  const accessToken = req.cookies?.accessToken || req.headers['authorization'];
  const refreshToken = req.cookies?.refreshToken || req.headers['x-refresh-token'];

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token not provided' });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
    req.user = decoded;
    return next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError' && refreshToken) {
      try {
        const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
        const newAccessToken = jwt.sign(
          { userId: (refreshDecoded as any).userId },
          process.env.JWT_ACCESS_SECRET as string,
          { expiresIn: '15m' }
        );
        res.setHeader('x-access-token', newAccessToken);
        req.user = refreshDecoded;
        return next();
      } catch (refreshErr) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid or expired access token' });
    }
  }
};