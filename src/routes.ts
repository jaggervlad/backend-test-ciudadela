import { Router } from 'express';
import { createUserRoutes } from './services/users';

export const publicRoutes = () => {
  const publicRouter = Router();

  publicRouter.use('/users', createUserRoutes());

  return publicRouter;
};
