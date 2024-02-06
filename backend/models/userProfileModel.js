const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserProfile = sequelize.define("UserProfile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  immediateHiring: DataTypes.BOOLEAN,

  // Profile Picture
  avatar: DataTypes.STRING,

  // Personal Information
  birthDate: DataTypes.DATEONLY,
  gender: {
    type: DataTypes.STRING,
    isIn: [["male", "female"]],
  },
  nationality: DataTypes.STRING,
  drivingLicense: DataTypes.BOOLEAN,
  phone: DataTypes.STRING,

  // Location
  country: DataTypes.STRING,
  city: DataTypes.STRING,
  area: DataTypes.STRING,

  // Interests
  currentCareerLevel: {
    type: DataTypes.STRING,
    isIn: [
      [
        "student",
        "entry",
        "experienced",
        "manager",
        "executive",
        "not specified",
      ],
    ],
    defaultValue: "not specified",
  },
  jobTypes: {
    type: DataTypes.JSON,
    set(value) {
      this.setDataValue("jobsType", JSON.stringify(value));
    },
    get() {
      return JSON.parse(this.getDataValue("jobsType"));
    },
  },
  jobTitles: {
    type: DataTypes.JSON,
    set(value) {
      this.setDataValue("jobTitles", JSON.stringify(value));
    },
    get() {
      return JSON.parse(this.getDataValue("jobTitles"));
    },
  },
  jobCategories: {
    type: DataTypes.JSON,
    set(value) {
      this.setDataValue("jobCategories", JSON.stringify(value));
    },
    get() {
      return JSON.parse(this.getDataValue("jobCategories"));
    },
  } , 
  // jobCategories: {
  //   type: DataTypes.STRING,
  // },
  
  companiesFind: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  publicProfile: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  // Experience
  totalYearsOfExperience: {
    type: DataTypes.INTEGER,
    isIn: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
  },

  // Education
  educationLevel: {
    type: DataTypes.STRING,
    isIn: [
      [
        "high school",
        "bachelor's degree",
        "master's degree",
        "doctorate",
        "diploma",
        "vocational",
      ],
    ],
    defaultValue: "high school",
  },

  // online presence
  linkedIn: DataTypes.STRING,
  twitter: DataTypes.STRING,
  facebook: DataTypes.STRING,
  github: DataTypes.STRING,
  stackOverflow: DataTypes.STRING,
  behance: DataTypes.STRING,
  youtube: DataTypes.STRING,
  website: DataTypes.STRING,
  other: DataTypes.STRING,

});

module.exports = UserProfile;



  /*
  // As associations
  Experiences (type, title, organization, industry, start date, end date, is current, description)
  Languages (language, reading, writing, speaking)
  Skills
  Educations (school, degree, field of study, grade, start date, end date, description)
  */