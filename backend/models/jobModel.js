const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  logo : DataTypes.STRING , 
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
  minExperience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  careerLevel: {
    type: DataTypes.ENUM(
      "Student",
      "Entry",
      "Junior",
      "Mid-level",
      "Experienced/Senior",
      "Manager/Lead"
    ),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(
      "Full time",
      "Part time",
      "Internship",
      "Volunteering",
      "Freelance project",
      "Shift based"
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
  deadline: DataTypes.DATE,
});
module.exports = Job;
