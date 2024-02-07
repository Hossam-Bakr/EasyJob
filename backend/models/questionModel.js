const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  questionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("text", "yes/no", "voice"),
    allowNull: false,
  },
});

module.exports = Question;
