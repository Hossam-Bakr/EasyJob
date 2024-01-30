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
});

module.exports = RequiredSkill;
