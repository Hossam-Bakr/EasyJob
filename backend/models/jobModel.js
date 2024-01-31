const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define("Job", {
  id: {
    type : DataTypes.INTEGER , 
    primaryKey : true , 
    autoIncrement : true , 
    allowNull : false, 
  } , 
  title: {
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: { msg: "Please enter your job title" }
    }
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: false,
    validate: {
      notEmpty: { msg: "Please enter your description" }
    }
  },
  requirements: {
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: { msg: "Please enter your requirements" }
    }
  },
  salary: {
    type: DataTypes.FLOAT, 
    allowNull: false,
    validate: {
      notEmpty: { msg: "Please enter your salary" }
    }
  },
  careerLevel: {
    type: DataTypes.ENUM(
      "Student", "Entry", "Junior", "Mid-level", "Experienced", "Senior",
      "Lead", "Manager", "Director", "Executive", "Consultant", "Entrepreneur",
      "Chief", "Not specified"
    ),
    defaultValue: "Not specified"
  },
  type: {
    type: DataTypes.ENUM(
      "Full time", "Part time", "Internship", "Temporary", "Freelance project",
      "Work from home", "Other"
    ),
    defaultValue: "Other"
  },
  location: {
    // type: DataTypes.GEOMETRY('POINT'), 
     type: DataTypes.STRING, 
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Please enter job deadline" },
      isDate: { msg: "Deadline must be a valid date" }
    }
  }
}, {
  timestamps: true
});
module.exports = Job;
