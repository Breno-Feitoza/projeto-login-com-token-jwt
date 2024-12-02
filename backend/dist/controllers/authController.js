"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthServices_1 = __importDefault(require("../services/AuthServices"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const token = yield AuthServices_1.default.authenticate(username, password);
                res.status(200).json({ token });
            }
            catch (error) {
                // Verificando se o erro é uma instância de Error, caso contrário, trata como um erro genérico
                const errorMessage = error instanceof Error ? error.message : 'Erro inesperado no login';
                res.status(401).json({ error: errorMessage });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const user = yield AuthServices_1.default.register(username, password);
                res.status(201).json(user);
            }
            catch (error) {
                // Verificando se o erro é uma instância de Error, caso contrário, trata como um erro genérico
                const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao registrar usuário';
                res.status(400).json({ error: errorMessage });
            }
        });
    }
}
exports.default = new AuthController();
