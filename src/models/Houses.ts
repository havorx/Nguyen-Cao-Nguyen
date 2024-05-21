import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';
import { sequelizeClient } from '../services/databases/sequelizeClient';

export class Houses extends Model<
  InferAttributes<Houses>,
  InferCreationAttributes<Houses>
> {
  declare id: CreationOptional<string>;
  declare address: string;
  declare residents: number;
  declare isDeleted: CreationOptional<boolean>;
  declare updatedAt: CreationOptional<string>;
  declare deletedAt: CreationOptional<string>;
}

Houses.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    residents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    isDeleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['address'],
      },
    ],
    paranoid: true,
    sequelize: sequelizeClient,
    modelName: 'houses',
  },
);
