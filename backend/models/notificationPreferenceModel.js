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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = NotificationPreference;
