const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Certification = sequelize.define("Certification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  credentialID: {
    type: DataTypes.STRING,
  },
  credentialURL: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Certification;
