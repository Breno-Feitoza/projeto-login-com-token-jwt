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
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class AuthServices {
    constructor() {
        this.userRepository = new UserRepository_1.default();
    }
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_1.User.findOne({ where: { username } });
                if (existingUser) {
                    throw new Error('Nome de usuário já existe.');
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield user_1.User.create({
                    username,
                    password: hashedPassword,
                });
                return newUser;
            }
            catch (error) {
                console.error("Erro ao tentar registrar:", error); // Log para entender o erro
                if (error instanceof Error) {
                    throw new Error(error.message); // Re-lança a mensagem do erro, caso o erro seja do tipo Error
                }
                else {
                    throw new Error('Erro inesperado ao registrar o usuário.');
                }
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Iniciando autenticação...");
            const user = yield this.userRepository.findByUsername(username);
            if (!user) {
                throw new Error('Usuário não encontrado.');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Senha inválida.');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'defaultsecret', {
                expiresIn: '1h',
            });
            console.log("Token gerado:", token); // Log de depuração
            return token;
        });
    }
}
exports.default = new AuthServices();
