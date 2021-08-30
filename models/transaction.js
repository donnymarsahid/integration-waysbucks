'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    static associate(models) {
      transaction.belongsTo(models.cart, {
        as: 'cart',
        foreignKey: {
          name: 'idOrder',
        },
      });
      transaction.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'idUser',
        },
      });
    }
  }
  transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idOrder: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'transaction',
    }
  );
  return transaction;
};
