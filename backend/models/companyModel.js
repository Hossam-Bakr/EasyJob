const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Company = sequelize.define("Company", {
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
      len: [3, 50] 
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true 
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.STRING,
  phone: DataTypes.STRING,
  industry: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  founded: DataTypes.DATE,
  size: {
    type: DataTypes.ENUM,
    values: ['1-10', '11-50', '51-200', '201-500', '500+']
  },
  avatar: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM,
    values: ['company'],
    defaultValue: 'company'
  }
}, {
  timestamps: true, 
  hooks: {
    beforeSave: async (company) => {
      if (company.changed('password')) {
        company.password = await bcrypt.hash(company.password, 12);
      }
    }
  }
});

// instance methods
Company.prototype.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

Company.prototype.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = Company;
