const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Company = sequelize.define(
  "Company",
  {
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
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["company"],
      defaultValue: "company",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    passwordResetCode: DataTypes.STRING,
    passwordResetExpire: DataTypes.DATE,
    passwordResetVerified: DataTypes.BOOLEAN,
    stripeCustomerId: DataTypes.STRING,
    stripeSubscriptionId: DataTypes.STRING,
    jobPostsUsed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unlocksUsed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    invitationsUsed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      beforeSave: async (company) => {
        if (company.changed("password")) {
          company.password = await bcrypt.hash(company.password, 12);
        }
      },
    },
    paranoid: true,
  }
);

// Instance methods
Company.prototype.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

Company.prototype.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = Company;
