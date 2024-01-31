const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Skill = sequelize.define("Skill", {
  id: {
    type : DataTypes.INTEGER , 
    primaryKey : true , 
    autoIncrement : true , 
    allowNull : false, 
  } , 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Please enter your skill name" }
    }
  },
  proficiency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: {
        args: [[1, 2, 3, 4, 5]],
        msg: "Proficiency must be between 1 and 5"
      }
    },
    defaultValue: 1
  },
  interest: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: {
        args: [[1, 2, 3, 4]],
        msg: "Interest must be between 1 and 4"
      }
    },
    defaultValue: 1
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  
}, {
  timestamps: true
});

module.exports = Skill;
