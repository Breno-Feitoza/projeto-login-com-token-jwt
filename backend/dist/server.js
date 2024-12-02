"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para configurar CORS e JSON
app.use((0, cors_1.default)()); // Permite que o frontend se conecte
app.use(express_1.default.json()); // Permite que o backend receba JSON
// Rotas de autenticação
app.use('/auth', AuthRoutes_1.default);
// Rota de fallback para erro não capturado
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});
// Sincronização com o banco de dados e inicialização do servidor
database_1.default.sync({ force: false })
    .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
    process.exit(1); // Finaliza o processo caso a conexão ao banco falhe
});
