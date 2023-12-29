import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handle';

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers?.authorization;
  const token = authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }

  req.user = decodedUser as any;

  next();
}
