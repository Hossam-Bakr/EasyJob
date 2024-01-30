const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Application = sequelize.define("Application", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["Pending", "Accepted", "Rejected"]],
  },
  answers: {
    type: DataTypes.JSON,
    set(value) {
      this.setDataValue("answers", JSON.stringify(value));
    },
    get() {
      return JSON.parse(this.getDataValue("answers"));
    },
  },
});

module.exports = Application;
