import { User } from './services/users';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: { id: string; name: string };
    }
  }
}
