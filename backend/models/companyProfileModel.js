const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CompanyProfile = sequelize.define("CompanyProfile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  // Media
  logo: DataTypes.STRING,
  coverPhoto: DataTypes.STRING,

  // Company Info
  country: DataTypes.STRING,
  city: DataTypes.STRING,
  // industry: DataTypes.STRING,
  size: {
    type: DataTypes.ENUM,
    values: ["1-10", "11-50", "51-200", "201-500", "500+"],
  },
  foundedYear: {
    type: DataTypes.INTEGER,
    len: [4, 4],
  },

  // About
  description: DataTypes.TEXT,
  location: DataTypes.GEOMETRY("POINT"),

  // Online Presence
  website: DataTypes.STRING,
  linkedin: DataTypes.STRING,
  facebook: DataTypes.STRING,
  twitter: DataTypes.STRING,
  instagram: DataTypes.STRING,
  youtube: DataTypes.STRING,
  blog: DataTypes.STRING,
  behance: DataTypes.STRING,
  vimeo: DataTypes.STRING,
});

module.exports = CompanyProfile;
