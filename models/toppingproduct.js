'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toppingProduct extends Model {
    static associate(models) {}
  }
  toppingProduct.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idProduct: DataTypes.INTEGER,
      idTopping: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'toppingProduct',
    }
  );
  return toppingProduct;
};
