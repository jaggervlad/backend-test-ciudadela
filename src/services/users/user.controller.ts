import { UserRespository, LoginResponse } from './user.respository';
import { NextFunction, Request, Response } from 'express';
import { validatePartialUserInput, validateUserInput } from './user.schema';
import { UserMongoRepository } from './user.mongo.repository';

export class UserController {
  userRespository: UserRespository;

  constructor(userRespository: UserRespository) {
    this.userRespository = userRespository;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userRespository.getAll();

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
      const id = req.params.id;
      const user = await this.userRespository.getById(id);

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

      await this.userRespository.create(data);

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
      const id = req.params.id;
      const body = req.body;

      const data = await validatePartialUserInput(body);

      await this.userRespository.updateById(id, data);

      return res.status(200).json({
        ok: true,
        error: null,
        data: 'Editado correctamente',
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await this.userRespository.deleteById(id);

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

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const loginResponse = await this.userRespository.login(email, password);

      return res.status(200).json({
        ok: true,
        error: null,
        data: loginResponse,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        ok: false,
        error: 'Algo salio mal intentalo de nuevo',
        data: null,
      });
    }
  };
}

const userRespository = new UserMongoRepository();

export const userController = new UserController(userRespository);
