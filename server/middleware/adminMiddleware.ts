import { NextFunction, Request, Response } from 'express';
import { AdminRequest } from '../serverTypes';




export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as AdminRequest).user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: admin only' });
  }

  next();
};
