const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
         // AllowNull True?
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
         // AllowNull True?
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: true, 
      // AllowNull True?
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
