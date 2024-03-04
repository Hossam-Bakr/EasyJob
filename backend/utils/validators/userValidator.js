const { check, body } = require("express-validator");
const validatorError = require("./validationError");
const bcrypt = require("bcryptjs");

exports.updateUserInfoValidator = [
  check("birthDate")
    .notEmpty()
    .withMessage("Please provide birth date")
    .isDate()
    .withMessage("Please provide valid birth date")
    .trim(),

  check("phone")
    .notEmpty()
    .withMessage("Please provide phone number")
    .isMobilePhone()
    .withMessage("Please provide valid phone number")
    .trim(),

  check("gender")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Please provide valid gender")
    .trim(),

  check("nationality")
    .notEmpty()
    .withMessage("Please provide a nationality")
    .isAlpha()
    .withMessage("Please provide valid nationality")
    .trim(),

  check("openToWork")
    .notEmpty()
    .isBoolean()
    .withMessage("Please provide valid open to work")
    .trim(),

  check("drivingLicense")
    .optional()
    .isBoolean()
    .withMessage("Please provide valid driving license")
    .trim(),

  check("country")
    .notEmpty()
    .withMessage("Please provide country")
    .isString()
    .withMessage("Country must be a string")
    .trim(),

  check("city")
    .notEmpty()
    .withMessage("Please provide city")
    .isString()
    .withMessage("City must be a string")
    .trim(),

  check("area")
    .optional()
    .isString()
    .withMessage("Area must be a string")
    .trim(),

  check("about")
    .optional()
    .isString()
    .withMessage("about must be a string")
    .trim()
    .isLength({ min: 45, max: 400 })
    .withMessage("About description must be between 45 and 400 characters"),

  validatorError,
];

exports.updateUserCareerInterestsValidator = [
  check("currentCareerLevel")
    .notEmpty()
    .withMessage("Please provide current career level")
    .isIn([
      "student",
      "entry level",
      "experienced/senior",
      "manager/lead",
      "executive", // SEO, CTO, CEO, etc.
      "not specified",
    ])
    .withMessage("Please provide valid career level")
    .trim(),

  check("jobTypes")
    .notEmpty()
    .withMessage("Please provide job types")
    .isArray()
    .withMessage("Job types must be an array")
    .trim()
    .custom((value) => {
      const allowedJobTypes = [
        "full-time",
        "part-time",
        "internship",
        "freelance/project",
        "shift-based",
        "volunteering",
        "student-activity",
      ];

      if (value.length === 0) {
        throw new Error("Job types must have at least one type");
      }

      for (const type of value) {
        if (!allowedJobTypes.includes(type)) {
          throw new Error("Please provide valid job types");
        }
      }

      return true;
    }),

  check("jobTitles")
    .notEmpty()
    .withMessage("Please provide job titles")
    .isArray()
    .withMessage("Job titles must be an array")
    .trim()
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Job titles must have at least one title");
      }
      return true;
    }),

  check("jobCategories")
    .notEmpty()
    .withMessage("Please provide job categories")
    .isArray()
    .withMessage("Job categories must be an array")
    .trim()
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Job categories must have at least one category");
      }
      return true;
    }),

  validatorError,
];

// Experience

exports.updateTotalExperienceValidator = [
  check("totalYearsOfExperience")
    .notEmpty()
    .withMessage("Please provide total years of experience")
    .isInt({ min: 0, max: 50 })
    .withMessage("Please provide valid total years of experience")
    .trim(),

  validatorError,
];

exports.addExperienceValidator = [
  check("type")
    .notEmpty()
    .withMessage("Please provide type")
    .isIn([
      "full-time",
      "part-time",
      "internship",
      "freelance/project",
      "volunteering",
      "student-activity",
    ])
    .withMessage("Please provide valid type")
    .trim(),

  check("title")
    .notEmpty()
    .withMessage("Please provide the work title")
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  check("category")
    .notEmpty()
    .withMessage("Please provide category")
    .isString()
    .withMessage("Category must be a string")
    .trim(),

  check("organization")
    .notEmpty()
    .withMessage("Please provide organization")
    .isString()
    .withMessage("Organization must be a string")
    .trim(),

  check("startDate")
    .notEmpty()
    .withMessage("Please provide start date")
    .isDate()
    .withMessage("Please provide valid start date")
    .trim(),

  check("endDate")
    .optional()
    .isDate()
    .withMessage("Please provide valid end date")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  validatorError,
];

exports.updateExperienceValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide id")
    .isInt()
    .withMessage("Please provide valid id")
    .trim(),

  check("type")
    .optional()
    .isIn([
      "full-time",
      "part-time",
      "internship",
      "freelance/project",
      "volunteering",
      "student-activity",
    ])
    .withMessage("Please provide valid type")
    .trim(),

  check("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  check("category")
    .optional()
    .isString()
    .withMessage("Category must be a string")
    .trim(),

  check("organization")
    .optional()
    .isString()
    .withMessage("Organization must be a string")
    .trim(),

  check("startDate")
    .optional()
    .isDate()
    .withMessage("Please provide valid start date")
    .trim(),

  check("endDate")
    .optional()
    .isDate()
    .withMessage("Please provide valid end date")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  validatorError,
];

exports.deleteExperienceValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide id")
    .isInt()
    .withMessage("Please provide valid id")
    .trim(),

  validatorError,
];

// Education

exports.updateEducationLevelValidator = [
  check("educationLevel")
    .notEmpty()
    .withMessage("Please provide education level")
    .isIn([
      "high school",
      "bachelor's degree",
      "master's degree",
      "doctorate",
      "diploma",
      "vocational",
    ])
    .withMessage("Please provide valid education level")
    .trim(),

  validatorError,
];

exports.addEducationValidator = [
  check("school")
    .notEmpty()
    .withMessage("Please provide school")
    .isString()
    .withMessage("School must be a string")
    .trim(),

  check("displayName")
    .notEmpty()
    .withMessage("Please provide degree display name")
    .isString()
    .withMessage("Degree display name must be a string")
    .trim(),

  check("degree")
    .notEmpty()
    .withMessage("Please provide degree")
    .isIn([
      "high school",
      "bachelor's degree",
      "master's degree",
      "MBA",
      "doctorate",
      "diploma",
      "vocational",
    ])
    .withMessage("Please provide valid degree"),

  check("fieldsOfStudy")
    .notEmpty()
    .withMessage("Please provide fields of study")
    .isArray()
    .withMessage("Fields of study must be an array")
    .trim()
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Fields of study must have at least one field");
      }
      return true;
    }),

  check("grade")
    .notEmpty()
    .withMessage("Please provide grade")
    .isIn(["A / 100-85", "B / 84-75", "C / 74-65", "D / 64-50"])
    .withMessage("Please provide valid grade"),
  check("startDate")
    .notEmpty()
    .withMessage("Please provide start date")
    .isDate()
    .withMessage("Please provide valid start date")
    .trim(),

  check("endDate")
    .notEmpty()
    .withMessage("Please provide end date")
    .isDate()
    .withMessage("Please provide valid end date")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  validatorError,
];

exports.updateEducationValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide id")
    .isInt()
    .withMessage("Please provide valid id")
    .trim(),

  check("school")
    .optional()
    .isString()
    .withMessage("School must be a string")
    .trim(),

  check("displayName")
    .optional()
    .isString()
    .withMessage("Degree display name must be a string")
    .trim(),

  check("degree")
    .optional()
    .isIn([
      "high school",
      "bachelor's degree",
      "master's degree",
      "MBA",
      "doctorate",
      "diploma",
      "vocational",
    ])
    .withMessage("Please provide valid degree"),

  check("fieldsOfStudy")
    .optional()
    .isArray()
    .withMessage("Fields of study must be an array")
    .trim()
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Fields of study must have at least one field");
      }
      return true;
    }),

  check("grade")
    .optional()
    .isIn(["A / 100-85", "B / 84-75", "C / 74-65", "D / 64-50"])
    .withMessage("Please provide valid grade"),
  check("startDate")
    .optional()
    .isDate()
    .withMessage("Please provide valid start date")
    .trim(),

  check("endDate")
    .optional()
    .isDate()
    .withMessage("Please provide valid end date")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  validatorError,
];

exports.deleteEducationValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide id")
    .isInt()
    .withMessage("Please provide valid id")
    .trim(),

  validatorError,
];

// Certification

exports.addCertificationValidator = [
  check("title")
    .notEmpty()
    .withMessage("Please provide title")
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  check("organization")
    .notEmpty()
    .withMessage("Please provide organization")
    .isString()
    .withMessage("Organization must be a string")
    .trim(),

  check("issueDate")
    .notEmpty()
    .withMessage("Please provide issue date")
    .isDate()
    .withMessage("Please provide valid issue date")
    .trim(),

  check("credentialID")
    .optional()
    .isString()
    .withMessage("Credential ID must be a string")
    .trim(),

  check("credentialURL")
    .optional()
    .isURL()
    .withMessage("Please provide valid credential URL")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  validatorError,
];

exports.updateCertificationValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide id")
    .isInt()
    .withMessage("Please provide valid id")
    .trim(),

  check("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  check("organization")
    .optional()
    .isString()
    .withMessage("Organization must be a string")
    .trim(),

  check("issueDate")
    .optional()
    .isDate()
    .withMessage("Please provide valid issue date")
    .trim(),

  check("credentialID")
    .optional()
    .isString()
    .withMessage("Credential ID must be a string")
    .trim(),

  check("credentialURL")
    .optional()
    .isURL()
    .withMessage("Please provide valid credential URL")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  validatorError,
];

exports.deleteCertificationValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide id")
    .isInt()
    .withMessage("Please provide valid id")
    .trim(),

  validatorError,
];

// Language

exports.addLanguageValidator = [
  check("language")
    .notEmpty()
    .withMessage("Please provide language")
    .isAlpha()
    .withMessage("Please provide valid language")
    .trim(),

  check("proficiency")
    .notEmpty()
    .withMessage("Please provide proficiency")
    .isIn(["beginner", "intermediate", "fluent", "native"])
    .withMessage("Please provide valid proficiency")
    .trim(),

  validatorError,
];

exports.updateLanguageValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide id")
    .isString()
    .withMessage("Please provide valid id")
    .trim(),

  check("language")
    .optional()
    .isAlpha()
    .withMessage("Please provide valid language")
    .trim(),

  check("proficiency")
    .optional()
    .isIn(["beginner", "intermediate", "fluent", "native"])
    .withMessage("Please provide valid proficiency")
    .trim(),

  validatorError,
];

exports.deleteLanguageValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide id")
    .isString()
    .withMessage("Please provide valid id")
    .trim(),

  validatorError,
];

// Online Presence

exports.updateOnlinePresenceValidator = [
  check("linkedIn")
    .optional()
    .isURL()
    .withMessage("Please provide valid linkedIn URL")
    .trim(),

  check("twitter")
    .optional()
    .isURL()
    .withMessage("Please provide valid twitter URL")
    .trim(),

  check("facebook")
    .optional()
    .isURL()
    .withMessage("Please provide valid facebook URL")
    .trim(),

  check("github")
    .optional()
    .isURL()
    .withMessage("Please provide valid github URL")
    .trim(),

  check("stackOverflow")
    .optional()
    .isURL()
    .withMessage("Please provide valid stackOverflow URL")
    .trim(),

  check("behance")
    .optional()
    .isURL()
    .withMessage("Please provide valid behance URL")
    .trim(),

  check("youtube")
    .optional()
    .isURL()
    .withMessage("Please provide valid youtube URL")
    .trim(),

  check("website")
    .optional()
    .isURL()
    .withMessage("Please provide valid website URL")
    .trim(),

  check("other")
    .optional()
    .isURL()
    .withMessage("Please provide valid other URL")
    .trim(),

  validatorError,
];

const commonPasswords = [
  "Password_123",
  "Abc_1234",
  "Welcome_123",
  "Admin_123",
  "User_123",
];

exports.changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("You must provide your current password"),

  body("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .custom((value) => !commonPasswords.includes(value))
    .withMessage("Password is too common. Please try another."),

  body("confirmNewPassword")
    .notEmpty()
    .withMessage("You must confirm your new password")
    .custom(async (val, { req }) => {
      if (
        req.body.currentPassword === req.body.newPassword &&
        req.body.newPassword === val
      ) {
        throw new Error(
          "New password is already in use, please try another password"
        );
      }
      const user = req.user;
      if (!user) {
        throw new Error("You are not authenticated");
      }

      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("The current password is incorrect");
      }

      if (req.body.newPassword !== val) {
        throw new Error("Password confirmation is incorrect");
      }
      return true;
    }),
  validatorError,
];
