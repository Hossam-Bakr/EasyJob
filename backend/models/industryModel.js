const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Industry = sequelize.define("Industry", {
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

module.exports = Industry;
