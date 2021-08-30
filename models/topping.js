'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topping extends Model {
    static associate(models) {
      topping.belongsToMany(models.product, {
        as: 'products',
        through: {
          model: 'toppingProduct',
          as: 'junction',
        },
        foreignKey: 'idTopping',
      });
    }
  }
  topping.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'topping',
    }
  );
  return topping;
};
