import { Request, Response } from 'express';
import authService from '../services/AuthServices';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await authService.authenticate(username, password);
      res.status(200).json({ token });
    } catch (error) {
      // Verificando se o erro é uma instância de Error, caso contrário, trata como um erro genérico
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado no login';
      res.status(401).json({ error: errorMessage });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // Validação dos campos
      if (!username || username.length < 4) {
        res.status(400).json({ error: 'O username deve ter pelo menos 4 caracteres.' });
        return;
      }

      if (!password || password.length < 4) {
        res.status(400).json({ error: 'A senha deve ter pelo menos 4 caracteres.' });
        return;
      }

      // Se a validação passar, prossiga com o registro
      const user = await authService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      // Verificando se o erro é uma instância de Error, caso contrário, trata como um erro genérico
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao registrar usuário';
      res.status(400).json({ error: errorMessage });
    }
  }
}

export default new AuthController();
