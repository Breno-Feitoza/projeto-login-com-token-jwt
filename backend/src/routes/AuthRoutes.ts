import { Router } from 'express';
import AuthController from '../controllers/authController'; 

const router = Router();

// Rota para registrar um novo usuário
router.post('/register', AuthController.register);  // Chamando o método de registro diretamente no controlador

// Rota para login
router.post('/login', AuthController.login);  // Chamando o método de login diretamente no controlador

export default router;
