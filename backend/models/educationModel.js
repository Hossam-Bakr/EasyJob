const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Education = sequelize.define("Education", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  degree: {
    type: DataTypes.ENUM(
      "high school",
      "bachelor's degree",
      "master's degree",
      "MBA",
      "doctorate",
      "diploma",
      "vocational"
    ),
    allowNull: false,
  },
  fieldsOfStudy: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  grade: {
    type: DataTypes.ENUM("A / 100-85", "B / 84-75", "C / 74-65", "D / 64-50"),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Education;
