import { createConnection } from '../../db/mysql-connection';
import { User, UserRow } from './user.schema';

export class UserModel {
  static async getAll() {
    const connection = await createConnection();
    const [users] = await connection.query('SELECT * FROM users');

    return users;
  }

  static async getById(id: number): Promise<User> {
    const connection = await createConnection();
    const [user] = await connection.query<UserRow[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    return user[0];
  }

  static async create(input: any) {
    const connection = await createConnection();
    const { name, last_name, age, address } = input;

    await connection.query(
      'INSERT INTO users (name, last_name, age, address) values (?,?,?,?)',
      [name, last_name, age, address]
    );
  }

  static async update(input: any, id: number) {
    const connection = await createConnection();
    await connection.query('UPDATE users SET ? WHERE id = ?', [input, id]);

    const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [
      id,
    ]);

    return user;
  }

  static async delete(id: number) {
    const connection = await createConnection();

    await connection.query('DELETE FROM users WHERE id = ?', [id]);
  }
}
