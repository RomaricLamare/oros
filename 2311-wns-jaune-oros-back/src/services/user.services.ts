import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import User, {
  InputRegister,
  InputChangeUserInfos,
} from '../entities/User.entity';

class UserServices {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository(User);
  }

  async list() {
    return await this.db.find({ relations: { reservations: true } });
  }

  async findById(id: string) {
    const user = await this.db.findOne({
      where: { id },
      relations: { reservations: true },
    });
    if (!user) {
      throw new Error("L'utilisateur n'existe pas");
    }
    return user;
  }


async findUserByEmail(email: string): Promise<User | null> {
  const user =  await this.db.findOne({
    where: { email },
    relations: ['session'],
  });
  return user;
}

  async create(data: InputRegister) {
    const newUser = await this.db.create(data);
    return await this.db.save(newUser);
  }

  async update(id: string, data: Omit<InputChangeUserInfos, 'id'>) {
    const findUser = await this.db.findOne({
      where: { id },
    });

    if (findUser) {
      const userToSave = this.db.merge(findUser, { ...data });
      return await this.db.save(userToSave);
    }
  }

  async delete(id: string) {
    const userToDelete = await this.db.findOne({
      where: { id },
    });

    if (!userToDelete) {
      throw new Error("L'utilisateur n'existe pas!");
    }

    return await this.db.remove(userToDelete);
  }
}

export default UserServices;
