const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Skill = sequelize.define("Skill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Skill;
