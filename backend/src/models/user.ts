import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';  // Certifique-se de que o caminho esteja correto

// Define a interface para os dados do usuário
interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Definindo o modelo User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  // Adicionando métodos de instância, se necessário
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Users',  // Defina explicitamente o nome da tabela como 'Users'
  }
);
export { User };
