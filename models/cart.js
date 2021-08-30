'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate(models) {
      cart.belongsTo(models.product, {
        as: 'product',
        foreignKey: {
          name: 'idProduct',
        },
      });
      cart.hasMany(models.transaction, {
        as: 'transactions',
        foreignKey: {
          name: 'idOrder',
        },
      });
    }
  }
  cart.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idProduct: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'cart',
    }
  );
  return cart;
};
