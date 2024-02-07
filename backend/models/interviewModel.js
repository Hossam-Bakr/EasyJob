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
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.GEOMETRY("POINT"),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["Scheduled", "Completed", "Canceled"]],
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

module.exports = Interview;
