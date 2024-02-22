const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CompanySpecialization = sequelize.define("CompanySpecialization", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = CompanySpecialization;
