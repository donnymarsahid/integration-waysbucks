'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    static associate(models) {
      notification.belongsTo(models.user, {
        as: 'sender',
        foreignKey: {
          name: 'idSender',
        },
      });
      notification.belongsTo(models.user, {
        as: 'recipient',
        foreignKey: {
          name: 'idRecipient',
        },
      });
    }
  }
  notification.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idSender: DataTypes.INTEGER,
      idRecipient: DataTypes.INTEGER,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'notification',
    }
  );
  return notification;
};
