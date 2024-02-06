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
  
      // Adjusted query to include related User information
      const userProfiles = await UserProfile.findAll({
        where: sequelize.literal(`JSON_CONTAINS(jobCategories->"$.name", '"${categoryName}"')`),
        include: [{
          model: User,
          as: 'User', // Ensure this alias matches how you've defined the relationship
          attributes: ['id', 'firstName', 'lastName', 'email', 'role'] // Specify the attributes you want to include from the User model
        }]
      });
  
      // Map over userProfiles to format the response if needed
      const formattedProfiles = userProfiles.map(profile => {
        return {
          userProfile: profile.dataValues, // Contains UserProfile data
          user: profile.User // Contains associated User data
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
  










// exports.getCandidatesByCompanyCategories = async (req, res) => {
//     const companyId = req.params.companyId;
//     try {
//       const companyCategories = await Company.findByPk(companyId, {
//         include: [{
//           model: Category,
//           as: "Industry",
//         }],
//       });
  
//       if (!companyCategories || !companyCategories.Industry) {
//         return res.status(404).json({ message: "Company or company categories not found" });
//       }
      
//       const categoryName = companyCategories.Industry.dataValues.name;
  
//       // Query to find user profiles where 'name' JSON array contains 'categoryName'
//       const userProfiles = await UserProfile.findAll({
//         where: sequelize.literal(`JSON_CONTAINS(jobCategories->"$.name", '"${categoryName}"')`)
//       });
  
//       const userProfileData = userProfiles.map(profile => profile.dataValues);
  
//       res.json({
//         status: "success",
//         userProfiles: userProfileData,
//       });
//     } catch (error) {
//       console.error("Error fetching candidates:", error);
//       res.status(500).json({
//         status: "error",
//         message: "Failed to fetch candidates.",
//       });
//     }
//   };
  























// exports.getCandidatesByCompanyCategories = async (req, res) => {
//     const companyId = req.params.companyId;
//     try {
//       const companyCategories = await Company.findByPk(companyId, {
//         include: [{
//           model: Category,
//           as: "Industry",
//         }],
//       });
  
//       if (!companyCategories || !companyCategories.Industry) {
//         return res.status(404).json({ message: "Company or company categories not found" });
//       }
      
//       const categoryName = companyCategories.Industry.dataValues.name;
  
//       // Adjusted query to correctly access JSON data
//       const userProfiles = await UserProfile.findAll({
//         where: sequelize.literal(`jobCategories->"$.name" = '${categoryName}'`)
//       });
  
//       const userProfileData = userProfiles.map(profile => profile.dataValues);
  
//       res.json({
//         status: "success",
//         userProfiles: userProfileData,
//       });
//     } catch (error) {
//       console.error("Error fetching candidates:", error);
//       res.status(500).json({
//         status: "error",
//         message: "Failed to fetch candidates.",
//       });
//     }
//   };
  


//   exports.getCandidatesByCompanyCategories = async (req, res) => {
//     const companyId = req.params.companyId;
//     try {
//       const companyCategories = await Company.findByPk(companyId, {
//         include: [
//           {
//             model: Category,
//             as: "Industry",
//           },
//         ],
//       });
  
//       if (!companyCategories || !companyCategories.Industry) {
//         return res
//           .status(404)
//           .json({ message: "Company or company categories not found" });
//       }
      
//       const categoryName = companyCategories.Industry.dataValues.name;
  
//       const userProfiles = await UserProfile.findAll({
//           where: {
//               jobCategories: categoryName 
//           }
//       });
  
//       const userProfileData = userProfiles.map(profile => profile.dataValues);
  
//       res.json({
//         status: "success",
//         userProfiles: userProfileData 
//       });
  
//     } catch (error) {
//       console.error("Error fetching candidates:", error);
//       res.status(500).json({
//         status: "error",
//         message: "Failed to fetch candidates.",
//       });
//     }
//   };
  