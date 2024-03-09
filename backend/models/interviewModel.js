const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Interview = sequelize.define("Interview", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  interviewDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  interviewTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["Scheduled", "Completed", "Canceled"]],
    defaultValue: "Scheduled",
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

module.exports = Interview;
