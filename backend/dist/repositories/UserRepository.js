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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
class UserRepository {
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Buscando usuário com o nome: ${username}`);
            return yield user_1.User.findOne({ where: { username } });
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Criando usuário:", userData);
            return yield user_1.User.create(userData);
        });
    }
}
exports.default = UserRepository;
