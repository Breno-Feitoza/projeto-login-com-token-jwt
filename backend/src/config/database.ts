import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('A variável de ambiente DATABASE_URL não está definida.');
}

const sequelize = new Sequelize(databaseUrl, {
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

export default sequelize;
