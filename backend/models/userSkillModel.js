const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserSkill = sequelize.define("UserSkill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  proficiency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    isIn: [[1, 2, 3, 4, 5]],
  },
  yearsOfExperience: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["0-1", "1-3", "3-5", "5-8", "10+"]],
  },
});

module.exports = UserSkill;
