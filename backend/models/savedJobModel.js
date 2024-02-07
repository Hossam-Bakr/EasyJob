const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SavedJob = sequelize.define("SavedJob", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
});

module.exports = SavedJob;
