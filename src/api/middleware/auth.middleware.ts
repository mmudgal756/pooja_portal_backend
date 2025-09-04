
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const auth = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Bypassing authentication for now.
    req.user = { id: '60d21b4667d0d8992e610c85', role: 'Vendor' }; // Mock user
    next();
    return;

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Forbidden' });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};
