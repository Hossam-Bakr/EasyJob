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
    isIn: [[1, 2, 3]],
  }
});

module.exports = UserSkill;
