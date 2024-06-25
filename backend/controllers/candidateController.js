const { Op } = require("sequelize");
const sequelize = require("sequelize");
const Company = require("../models/companyModel");
const UserProfile = require("../models/userProfileModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const Industry = require("../models/industryModel");

exports.getCandidatesByCompanyCategories = async (req, res) => {
  const companyId = req.params.companyId;
  const { search, filter } = req.query;

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

    const categoryNames = categories.map(cat => cat.name);

    const searchQueries = categoryNames.map(name => 
      sequelize.where(
        sequelize.fn('JSON_CONTAINS', sequelize.col('jobCategories'), `"${name}"`), 1
      )
    );

    let whereConditions = {
      [Op.or]: searchQueries
    };

    if (search) {
      whereConditions = {
        ...whereConditions,
        [Op.or]: [
          { '$User.firstName$': { [Op.like]: `%${search}%` } },
          { '$User.lastName$': { [Op.like]: `%${search}%` } },
          { '$User.email$': { [Op.like]: `%${search}%` } },
          { jobTitles: sequelize.where(
              sequelize.fn('JSON_CONTAINS', sequelize.col('jobTitles'), `"${search}"`), 1
            )
          },
          { about: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    if (filter) {
      if (filter.jobTitle) {
        whereConditions = {
          ...whereConditions,
          jobTitles: sequelize.where(
            sequelize.fn('JSON_CONTAINS', sequelize.col('jobTitles'), `"${filter.jobTitle}"`),
            1
          )
        };
      }
      if (filter.country) {
        whereConditions = {
          ...whereConditions,
          country: filter.country
        };
      }
      if (filter.city) {
        whereConditions = {
          ...whereConditions,
          city: filter.city
        };
      }
      if (filter.area) {
        whereConditions = {
          ...whereConditions,
          area: filter.area
        };
      }
      if (filter.degreeLevel) {
        whereConditions = {
          ...whereConditions,
          educationLevel: filter.degreeLevel
        };
      }
      if (filter.language) {
        const languageArray = Array.isArray(filter.language) ? filter.language : [filter.language];
        const languageQueries = languageArray.map(lang => 
          sequelize.where(
            sequelize.fn('JSON_CONTAINS', sequelize.col('languages'), `{"language": "${lang}"}`), 1
          )
        );

        whereConditions = {
          ...whereConditions,
          [Op.and]: languageQueries
        };
      }
      if (filter.jobType) {
        const jobTypeArray = Array.isArray(filter.jobType) ? filter.jobType : [filter.jobType];
        const jobTypeQueries = jobTypeArray.map(type => 
          sequelize.where(
            sequelize.fn('JSON_CONTAINS', sequelize.col('jobTypes'), `"${type}"`), 1
          )
        );

        whereConditions = {
          ...whereConditions,
          [Op.and]: jobTypeQueries
        };
      }
      if (filter.minExperience) {
        whereConditions = {
          ...whereConditions,
          totalYearsOfExperience: {
            [Op.gte]: parseFloat(filter.minExperience)
          }
        };
      }
      if (filter.maxExperience) {
        whereConditions = {
          ...whereConditions,
          totalYearsOfExperience: {
            ...whereConditions.totalYearsOfExperience,
            [Op.lte]: parseFloat(filter.maxExperience)
          }
        };
      }

      if (filter.openToWork !== undefined) {
        whereConditions = {
          ...whereConditions,
          openToWork: filter.openToWork === 'true'
        };
      }

      if (filter.careerLevel) {
        whereConditions = {
          ...whereConditions,
          currentCareerLevel: filter.careerLevel
        };
      }

      if (filter.drivingLicense !== undefined) {
        whereConditions = {
          ...whereConditions,
          drivingLicense: filter.drivingLicense === 'true'
        };
      }

      if (filter.jobCategories) {
        const jobCategoriesArray = Array.isArray(filter.jobCategories) ? filter.jobCategories : [filter.jobCategories];
        const jobCategoriesQueries = jobCategoriesArray.map(name => 
          sequelize.where(
            sequelize.fn('JSON_CONTAINS', sequelize.col('jobCategories'), `"${name}"`), 1
          )
        );

        whereConditions = {
          ...whereConditions,
          [Op.and]: jobCategoriesQueries
        };
      }
    }

    const userProfiles = await UserProfile.findAll({
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "role"]
      }],
      where: whereConditions
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
