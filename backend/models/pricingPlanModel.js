const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PricingPlan = sequelize.define("PricingPlan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["Basic", "Premium", "Enterprise"]],
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // description: {
  //   type: DataTypes.TEXT,
  //   allowNull: false,
  // },
  maxJobPosts: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = PricingPlan;
