"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('A variável de ambiente DATABASE_URL não está definida.');
}
const sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: console.log, // Exibe logs do Sequelize no console
    dialectOptions: {
        ssl: {
            require: true, // Certifique-se de que SSL é exigido para conexões externas
            rejectUnauthorized: false, // Permite conexões sem verificação do certificado
        },
    },
});
exports.default = sequelize;
