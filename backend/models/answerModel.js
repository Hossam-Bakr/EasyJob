const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Answer = sequelize.define("Answer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // textAnswer: DataTypes.TEXT,
  // yesNoAnswer: DataTypes.BOOLEAN,
  // voiceAnswer: DataTypes.STRING,

  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Answer;
