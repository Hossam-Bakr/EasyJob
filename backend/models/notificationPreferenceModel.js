const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NotificationPreference = sequelize.define("NotificationPreference", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [
      [
        "newJobPostings",
        "companyUpdates",
        "applicationStatus",
        "recommendedJobs",
        "resumeTips",
        "interviewTips",
        "subscriptionStatus",
      ],
    ],
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["weekly", "monthly"]],
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = NotificationPreference;
