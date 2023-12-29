import { RowDataPacket } from 'mysql2';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string({ required_error: 'Nombre es requerido' }),
  email: z.string().email(),
  password: z.string(),
  age: z
    .number({ required_error: 'Edad es requerida' })
    .positive({ message: 'Solo números positivo' })
    .int({ message: 'Solo números enteros' }),
  address: z.string().nullable().optional(),
});

export type IUserCreate = z.infer<typeof userSchema>;

export type User = {
  name: string;
  email: string;
  age: number;
  address?: string | null | undefined;
};

export type UserRow = User & RowDataPacket;

export const validateUserInput = (body: User) => {
  return userSchema.parseAsync(body);
};

export const validatePartialUserInput = (body: Partial<User>) => {
  return userSchema.partial().parseAsync(body);
};
