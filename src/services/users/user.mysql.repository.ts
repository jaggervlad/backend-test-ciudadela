import { createConnection } from '../../db/mysql-connection';
import { UserRespository } from './user.respository';
import { User, UserRow } from './user.schema';

export class UserMysqlRepository implements UserRespository {
  login(
    email: string,
    password: string
  ): Promise<{
    token: string;
    user: {
      name: string;
      email: string;
      age: number;
      password?: string | null | undefined;
      address?: string | null | undefined;
    };
  }> {
    throw new Error('Method not implemented.');
  }
  async getAll(): Promise<User[]> {
    const connection = await createConnection();
    const [users] = await connection.query<UserRow[]>('SELECT * FROM users');

    return users;
  }

  async getById(id: string): Promise<User> {
    const connection = await createConnection();
    const [user] = await connection.query<UserRow[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    return user[0];
  }

  async create(input: Partial<User>) {
    const connection = await createConnection();
    const { name, age, address } = input;

    await connection.query(
      'INSERT INTO users (name,  age, address) values (?,?,?,?)',
      [name, age, address]
    );
  }

  async updateById(id: string, input: Partial<User>): Promise<void> {
    const connection = await createConnection();
    await connection.query('UPDATE users SET ? WHERE id = ?', [input, id]);
  }

  async deleteById(id: string) {
    const connection = await createConnection();

    await connection.query('DELETE FROM users WHERE id = ?', [id]);
  }
}
