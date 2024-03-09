const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Application = sequelize.define("Application", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["Pending", "Accepted", "Closed"]],
    defaultValue: "Pending",
  },
  stage: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["Submitted", "Reviewed", "Marked"]],
    defaultValue: "Submitted",
  },
});

module.exports = Application;
