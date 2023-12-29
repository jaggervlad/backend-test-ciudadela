import { compareHashedString, hashString } from '../../utils/hash.handle';
import { generateToken } from '../../utils/jwt.handle';
import { UserModel } from './user.mongo.schema';
import { LoginResponse, UserRespository } from './user.respository';
import { IUserCreate, User } from './user.schema';
import { isValidObjectId } from 'mongoose';

export class UserMongoRepository implements UserRespository {
  async getAll(): Promise<User[]> {
    const users = await UserModel.find().select('-password');

    return users;
  }
  async getById(id: string): Promise<User | null> {
    if (!isValidObjectId(id)) return null;

    const user = await UserModel.findById(id);

    return user;
  }
  async create(payload: IUserCreate): Promise<void> {
    const { password } = payload;

    const hashPassword = await hashString(password);

    // Change with migth fail
    if (!hashPassword) throw new Error('Error hashed password');

    const newUser = new UserModel({ ...payload, password: hashPassword });

    await newUser.save();
  }
  async updateById(id: string, payload: Partial<User>): Promise<void> {
    if (!isValidObjectId(id)) throw new Error('Invalida ObjectId');

    await UserModel.findByIdAndUpdate(id, payload);
  }
  async deleteById(id: string): Promise<void> {
    if (!isValidObjectId(id)) throw new Error('Invalida ObjectId');

    await UserModel.findByIdAndDelete(id);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const existUser = await UserModel.findOne({ email: email });

    if (!existUser) {
      throw new Error('Error user not exist');
    }

    const matchPassword = await compareHashedString(
      password,
      existUser.password
    );

    // Change with migth fail
    if (!matchPassword) throw new Error('Error compare passwords');

    const token = generateToken({ id: existUser.id, name: existUser.name });

    if (!token) throw new Error('Error creating token');

    return { token };
  }
}

const mockLoginData = {
  token: 'asdasljdhalsjdhlasd',
  user: {
    id: 'asdasdasd',
    name: 'sebastian acosta',
    email: 'seacal.pe',
    age: 12,
  },
};
