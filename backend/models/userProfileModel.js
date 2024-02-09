const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserProfile = sequelize.define("UserProfile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },

  // Media
  avatar: DataTypes.STRING,
  coverPhoto: DataTypes.STRING,

  // Personal Information
  birthDate: DataTypes.DATEONLY,
  phone: DataTypes.STRING,
  gender: {
    type: DataTypes.STRING,
    isIn: [["male", "female"]],
  },
  nationality: DataTypes.STRING,
  drivingLicense: DataTypes.BOOLEAN,

  // Location
  country: DataTypes.STRING,
  city: DataTypes.STRING,
  area: DataTypes.STRING,

  // Interests
  currentCareerLevel: {
    type: DataTypes.ENUM(
      "student",
      "entry",
      "experienced",
      "manager",
      "executive",
      "not specified"
    ),
    defaultValue: "not specified",
  },
  jobTypes: DataTypes.JSON,
  jobTitles: DataTypes.JSON,
  jobCategories: DataTypes.JSON,

  /*
  companiesFind: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  publicProfile: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  */

  // Experience
  totalYearsOfExperience: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 50,
    },
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
  },

  // languages [[id, language, proficiency], ...]
  languages: DataTypes.JSON,

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
  Skills
  Educations (school, degree, field of study, grade, start date, end date, description)
  Certifications (title, organization, issue date, credential ID, credential URL)
  */
