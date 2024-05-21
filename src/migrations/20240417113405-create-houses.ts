import { DataTypes, QueryInterface } from 'sequelize';
import { Houses } from '../models/Houses';

export async function up({ context: query }: { context: QueryInterface }) {
  await query.createTable('houses', {
    id: {
      type: DataTypes.UUID,
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
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
      allowNull: true,
      type: DataTypes.DATE,
    },
  });

  await query.addIndex('houses', ['address']);

  await Houses.bulkCreate([
    {
      address: '30 Pham Ngoc Thach Street',
      residents: 4,
    },
    {
      address: '10 Hoang Cau Street',
      residents: 4,
    },
    {
      address: '45 Chua Boc Street',
      residents: 6,
    },
    {
      address: '2 Lang Ha Street',
      residents: 0,
    },
  ]);
}

export async function down({ context: query }: { context: QueryInterface }) {
  await query.dropTable('houses');
}
