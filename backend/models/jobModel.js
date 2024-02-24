const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  workplace: {
    type: DataTypes.ENUM("remote", "office", "hybrid"),
    allowNull: false,
  },
  salaryRangeMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salaryRangeMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hideSalary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  minExperience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  careerLevel: {
    type: DataTypes.ENUM(
      "student",
      "entry level",
      "experienced/senior",
      "manager/lead",
      "executive"
    ),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(
      "full-time",
      "part-time",
      "internship",
      "freelance/project",
      "shift-based",
      "volunteering",
      "student-activity"
    ),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  openPositions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Job;
