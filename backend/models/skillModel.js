const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Skill = sequelize.define("Skill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Please enter your skill name" },
    },
  },
  // industry: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
});

module.exports = Skill;
