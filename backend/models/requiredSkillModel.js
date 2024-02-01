const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RequiredSkill = sequelize.define("RequiredSkill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  minLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    isIn: [[1, 2, 3, 4, 5]],
  },
  minYearsOfExperience: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["0-1", "1-3", "3-5", "5-8", "10+"]],
  },
});

module.exports = RequiredSkill;
