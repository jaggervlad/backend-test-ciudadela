import { User } from './user.schema';

export interface UserRespository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  create(payload: Partial<User>): Promise<void>;
  updateById(id: number, payload: Partial<User>): Promise<void>;
  deleteById(id: number): Promise<void>;
}
