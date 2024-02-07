const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JobCategory = sequelize.define("JobCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = JobCategory;
