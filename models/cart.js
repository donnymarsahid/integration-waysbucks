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
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      quantity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'cart',
    }
  );
  return cart;
};
