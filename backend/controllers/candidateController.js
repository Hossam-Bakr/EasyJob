const sequelize = require("sequelize");
const Company = require("../models/companyModel");
const UserProfile = require("../models/userProfileModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const Industry = require("../models/industryModel");

exports.getCandidatesByCompanyCategories = async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const company = await Company.findByPk(companyId, {
      include: { model: Industry }
    });

    if (!company || !company.Industry) {
      return res.status(404).json({ message: "Company or industry not found" });
    }

    const categories = await Category.findAll({
      where: { IndustryId: company.Industry.id }
    });

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found for this industry" });
    }

    // Get an array of category names
    const categoryNames = categories.map(cat => cat.name);

    // Building the JSON search query for MySQL
    const searchQueries = categoryNames.map(name => 
      sequelize.where(
        sequelize.fn('JSON_CONTAINS', sequelize.col('jobCategories'), `"${name}"`), 1
      )
    );

    const userProfiles = await UserProfile.findAll({
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "role"]
      }],
      where: {
        [sequelize.Op.or]: searchQueries
      }
    });

    const formattedProfiles = userProfiles.map(profile => ({
      userProfile: profile.dataValues,
      user: profile.User.dataValues
    }));
    
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
