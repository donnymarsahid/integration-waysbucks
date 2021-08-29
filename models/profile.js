'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    static associate(models) {}
  }
  profile.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'profile',
    }
  );
  return profile;
};
