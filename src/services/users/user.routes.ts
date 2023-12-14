import { Router } from 'express';
import { UserController } from './user.controller';
import { UserModel } from './user.model';

type UserRoutesProps = {
  userModel: typeof UserModel;
};

export const createUserRoutes = ({ userModel }: UserRoutesProps) => {
  const router = Router();

  const userController = new UserController({ userModel });

  router.get('/', userController.getAll);
  router.get('/:id', userController.getById);
  router.post('/', userController.create);
  router.put('/:id', userController.update);
  router.delete('/:id', userController.delete);

  return router;
};
