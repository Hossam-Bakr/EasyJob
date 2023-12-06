const { check } = require("express-validator");
const validatorError = require("./validationError");
// const Job = require("../../models/jobModel");

exports.getJobValidator = [
  check("id").trim().isMongoId().withMessage("Please provide valid job id"),
  validatorError,
];

exports.createJobValidator = [
  check("title")
    .notEmpty()
    .withMessage("Please provide job title")
    .isLength({ max: 70 })
    .withMessage("Job title cannot exceed 70 characters")
    .trim(),

  check("description")
    .notEmpty()
    .withMessage("Please provide job description")
    .trim(),

  check("requirements")
    .notEmpty()
    .withMessage("Please provide job requirements")
    .isArray({ min: 1 })
    .withMessage("Requirements must be an array of strings")
    .trim(),

  check("salary")
    .notEmpty()
    .withMessage("Please provide job salary")
    .isNumeric()
    .withMessage("Salary must be a number")
    .trim(),

  check("careerLevel")
    .optional()
    .isIn([
      "Student",
      "Entry",
      "Junior",
      "Mid-level",
      "Experienced",
      "Senior",
      "Lead",
      "Manager",
      "Director",
      "Executive",
      "Consultant",
      "Entrepreneur",
      "Chief",
      "Not specified",
    ])
    .withMessage("Please provide valid career level")
    .trim(),

  check("type")
    .optional()
    .isIn([
      "Full time",
      "Part time",
      "Internship",
      "Temporary",
      "Freelance project",
      "Work from home",
      "Other",
    ])
    .withMessage("Please provide valid job type")
    .trim(),

  check("location")
    .notEmpty()
    .withMessage("Location is required")
    .isObject()
    .withMessage("Location must be an object")
    .custom((value) => {
      if (!value.type || value.type !== "Point") {
        return Promise.reject("Location type must be Point");
      }

      if (
        !value.coordinates ||
        !Array.isArray(value.coordinates) ||
        value.coordinates.length !== 2
      ) {
        return Promise.reject("Invalid coordinates in location");
      }

      const [longitude, latitude] = value.coordinates;
      if (isNaN(longitude) || isNaN(latitude)) {
        return Promise.reject("Invalid coordinates in location");
      }

      return true;
    }),

  check("deadline")
    .notEmpty()
    .withMessage("Please provide job deadline")
    .isDate()
    .withMessage("Please provide valid deadline")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        return Promise.reject("Please provide valid deadline date");
      }
      return true;
    }),

  validatorError,
];

exports.updateJobValidator = [
  check("id").trim().isMongoId().withMessage("Please provide valid job id"),

  check("title")
    .optional()
    .notEmpty()
    .withMessage("Please provide job title")
    .isLength({ max: 70 })
    .withMessage("Job title cannot exceed 70 characters")
    .trim(),

  check("description")
    .optional()
    .notEmpty()
    .withMessage("Please provide job description")
    .trim(),

  check("requirements")
    .optional()
    .notEmpty()
    .withMessage("Please provide job requirements")
    .isArray({ min: 1 })
    .withMessage("Requirements must be an array of strings")
    .trim(),

  check("salary")
    .optional()
    .notEmpty()
    .withMessage("Please provide job salary")
    .isNumeric()
    .withMessage("Salary must be a number")
    .trim(),

  check("careerLevel")
    .optional()
    .isIn([
      "Student",
      "Entry",
      "Junior",
      "Mid-level",
      "Experienced",
      "Senior",
      "Lead",
      "Manager",
      "Director",
      "Executive",
      "Consultant",
      "Entrepreneur",
      "Chief",
      "Not specified",
    ])
    .withMessage("Please provide valid career level")
    .trim(),

  check("type")
    .optional()
    .isIn([
      "Full time",
      "Part time",
      "Internship",
      "Temporary",
      "Freelance project",
      "Work from home",
      "Other",
    ])
    .withMessage("Please provide valid job type")
    .trim(),

  check("location")
    .optional()
    .notEmpty()
    .withMessage("Location is required")
    .isObject()
    .withMessage("Location must be an object")
    .custom((value) => {
      if (!value.type || value.type !== "Point") {
        return Promise.reject("Location type must be Point");
      }

      if (
        !value.coordinates ||
        !Array.isArray(value.coordinates) ||
        value.coordinates.length !== 2
      ) {
        return Promise.reject("Invalid coordinates in location");
      }

      const [longitude, latitude] = value.coordinates;
      if (isNaN(longitude) || isNaN(latitude)) {
        return Promise.reject("Invalid coordinates in location");
      }

      return true;
    }),

  check("deadline")
    .optional()
    .notEmpty()
    .withMessage("Please provide job deadline")
    .isDate()
    .withMessage("Please provide valid deadline")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        return Promise.reject("Please provide valid deadline date");
      }
      return true;
    }),

  validatorError,
];

exports.deleteJobValidator = [
  check("id").trim().isMongoId().withMessage("Please provide valid job id"),
  validatorError,
];
