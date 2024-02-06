const sequelize = require("sequelize");
const Company = require("../models/companyModel");
const UserProfile = require("../models/userProfileModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");


exports.getCandidatesByCompanyCategories = async (req, res) => {
    const companyId = req.params.companyId;
    try {
      const companyCategories = await Company.findByPk(companyId, {
        include: [{
          model: Category,
          as: "Industry",
        }],
      });
  
      if (!companyCategories || !companyCategories.Industry) {
        return res.status(404).json({ message: "Company or company categories not found" });
      }
  
      const categoryName = companyCategories.Industry.dataValues.name;
  
      const userProfiles = await UserProfile.findAll({
        where: sequelize.literal(`JSON_CONTAINS(jobCategories->"$.name", '"${categoryName}"')`),
        include: [{
          model: User,
          as: 'User',
          attributes: ['id', 'firstName', 'lastName', 'email', 'role'] 
        }]
      });
  
      const formattedProfiles = userProfiles.map(profile => {
        return {
          userProfile: profile.dataValues,
          user: profile.User 
        };
      });
  
      res.json({
        status: "success",
        candidates: formattedProfiles,
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to fetch candidates.",
      });
    }
  };
  
