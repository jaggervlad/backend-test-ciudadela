import { Router } from 'express';
import { userController } from './user.controller';

export const createUserRoutes = () => {
  const router = Router();

  router.get('/', userController.getAll);
  router.get('/:id', userController.getById);
  router.post('/', userController.create);
  router.put('/:id', userController.update);
  router.delete('/:id', userController.delete);

  return router;
};
