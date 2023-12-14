import { RowDataPacket } from 'mysql2';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string({ required_error: 'Nombre es requerido' }),
  last_name: z.string({ required_error: 'Apellido es requerido' }),
  age: z
    .number({ required_error: 'Edad es requerida' })
    .positive({ message: 'Solo números positivo' })
    .int({ message: 'Solo números enteros' }),
  address: z.string().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;

export type UserRow = User & RowDataPacket;

export const validateUserInput = (body: any) => {
  return userSchema.parseAsync(body);
};

export const validatePartialUserInput = (body: any) => {
  return userSchema.partial().parseAsync(body);
};
