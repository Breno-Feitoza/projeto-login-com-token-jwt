"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.Router)();
// Rota para registrar um novo usuário
router.post('/register', authController_1.default.register); // Chamando o método de registro diretamente no controlador
// Rota para login
router.post('/login', authController_1.default.login); // Chamando o método de login diretamente no controlador
exports.default = router;
