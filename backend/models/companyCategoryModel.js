const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CompanyCategory = sequelize.define("CompanyCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = CompanyCategory;
