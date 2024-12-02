import { User } from '../models/user';

class UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    console.log(`Buscando usuário com o nome: ${username}`);
    return await User.findOne({ where: { username } });
  }

  async create(userData: { username: string, password: string }): Promise<User> {
    console.log("Criando usuário:", userData);
    return await User.create(userData);
  }
}

export default UserRepository;
