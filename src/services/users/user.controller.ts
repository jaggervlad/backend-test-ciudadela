import { NextFunction, Request, Response } from 'express';
import { UserModel } from './user.model';
import { ZodError } from 'zod';
import { validatePartialUserInput, validateUserInput } from './user.schema';

type UserControllerType = {
  userModel: typeof UserModel;
};

export class UserController {
  userModel: typeof UserModel;

  constructor({ userModel }: UserControllerType) {
    this.userModel = userModel;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userModel.getAll();

      return res.status(200).json({
        ok: true,
        error: null,
        data: users,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        ok: false,
        error: 'Algo salio mal',
        data: [],
      });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      const user = await this.userModel.getById(id);

      return res.status(200).json({
        ok: true,
        error: null,
        data: user,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        ok: false,
        error: 'Algo salio mal',
        data: null,
      });
    }
  };
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const data = await validateUserInput(body);

      await this.userModel.create(data);

      return res.status(200).json({
        ok: true,
        error: null,
        data: 'Usuario creado correctamente',
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const body = req.body;

      const data = await validatePartialUserInput(body);

      const user = await this.userModel.update(data, id);

      return res.status(200).json({
        ok: true,
        error: null,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      await this.userModel.delete(id);

      return res.status(200).json({
        ok: true,
        error: null,
        data: 'Usuario eliminado correctamente',
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        ok: false,
        error: 'Algo salio mal',
        data: null,
      });
    }
  };
}

const handleError = (error: unknown) => {};
