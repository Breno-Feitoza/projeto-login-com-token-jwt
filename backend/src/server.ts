import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/AuthRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para configurar CORS e JSON
app.use(cors()); // Permite que o frontend se conecte
app.use(express.json()); // Permite que o backend receba JSON

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rota de fallback para erro não capturado
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Sincronização com o banco de dados e inicialização do servidor
sequelize.sync({ force: false })
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
