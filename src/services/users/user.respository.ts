import { User } from './user.schema';

export type LoginResponse = {
  token: string;
};

export interface UserRespository {
  getAll(): Promise<User[]>;
  getById(id: string | number): Promise<User | null>;

  create(payload: Partial<User>): Promise<void>;
  updateById(id: string | number, payload: Partial<User>): Promise<void>;
  deleteById(id: string | number): Promise<void>;
  login(email: string, password: string): Promise<LoginResponse>;
}
