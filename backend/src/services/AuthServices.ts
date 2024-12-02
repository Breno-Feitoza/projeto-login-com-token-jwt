import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';

class AuthServices {
  private userRepository = new UserRepository();

  async register(username: string, password: string): Promise<User> {
    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        throw new Error('Nome de usuário já existe.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      console.error("Erro ao tentar registrar:", error); // Log para entender o erro
      if (error instanceof Error) {
        throw new Error(error.message);  // Re-lança a mensagem do erro, caso o erro seja do tipo Error
      } else {
        throw new Error('Erro inesperado ao registrar o usuário.');
      }
    }
  }
  
  async authenticate(username: string, password: string): Promise<string> {
    console.log("Iniciando autenticação...");

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1h',
    });

    console.log("Token gerado:", token);  // Log de depuração

    return token;
  }
}

export default new AuthServices();

