const { check } = require("express-validator");
const validatorError = require("./validationError");
// const Job = require("../../models/jobModel");

exports.createJobValidator = [
  check("title")
    .notEmpty()
    .withMessage("Please provide job title")
    .isLength({ max: 100 })
    .withMessage("Job title can not exceed 100 characters")
    .trim(),

  check("description")
    .notEmpty()
    .withMessage("Please provide job description")
    .isString()
    .withMessage("Requirements must be a string")
    .isLength({ min: 20 })
    .withMessage("Requirements must be at least 20 characters")
    .trim(),

  check("requirements")
    .notEmpty()
    .withMessage("Please provide job requirements")
    .isString()
    .withMessage("Requirements must be a string")
    .isLength({ min: 20 })
    .withMessage("Requirements must be at least 20 characters")
    .trim(),

  check("workplace")
    .notEmpty()
    .withMessage("Please provide job workplace")
    .isIn(["remote", "office", "hybrid"])
    .withMessage("Please provide valid workplace")
    .trim(),

  check("salaryRangeMin")
    .notEmpty()
    .withMessage("Please provide job minimum salary")
    .isNumeric()
    .withMessage("Salary must be a number")
    .trim(),

  check("salaryRangeMax")
    .notEmpty()
    .withMessage("Please provide job maximum salary")
    .isNumeric()
    .withMessage("Salary must be a number")
    .trim(),

  check("hideSalary")
    .optional()
    .isBoolean()
    .withMessage("Please provide valid hide salary value")
    .trim(),

  check("minExperience")
    .notEmpty()
    .withMessage("Please provide job minimum experience")
    .isNumeric()
    .withMessage("Experience must be a number")
    .trim(),

  check("careerLevel")
    .notEmpty()
    .withMessage("Please provide job career level")
    .isIn([
      "student",
      "entry level",
      "experienced/senior",
      "manager/lead",
      "executive",
    ])
    .withMessage("Please provide valid career level")
    .trim(),

  check("type")
    .notEmpty()
    .withMessage("Please provide job type")
    .isIn([
      "full-time",
      "part-time",
      "internship",
      "freelance/project",
      "shift-based",
      "volunteering",
      "student-activity",
    ])
    .withMessage("Please provide valid job type")
    .trim(),

  check("country")
    .notEmpty()
    .withMessage("Please provide job country")
    .isString()
    .withMessage("Country must be a string")
    .trim(),

  check("city")
    .notEmpty()
    .withMessage("Please provide job city")
    .isString()
    .withMessage("City must be a string")
    .trim(),

  check("openPositions")
    .notEmpty()
    .withMessage("Please provide job open positions")
    .isNumeric()
    .withMessage("Open positions must be a number")
    .trim(),

  // keywords is a string of comma separated values (e.g. "javascript, react, frontend")
  check("keywords")
    .notEmpty()
    .withMessage("Please provide job keywords")
    .isString()
    .withMessage("Keywords must be a string")
    .custom((value) => {
      if (value.split(",").length < 2) {
        return Promise.reject("Please provide at least 2 keywords");
      }

      if (value.split(",").some((keyword) => keyword.trim().length < 2)) {
        return Promise.reject("Keywords must be at least 2 characters long");
      }

      return true;
    })
    .trim(),

  /*
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
  */

  check("categoriesId")
    .notEmpty()
    .withMessage("Please provide job categories")
    .isArray({ min: 1 })
    .withMessage("Categories must be an array of at least 1 category id")
    .trim(),

  validatorError,
];

exports.updateJobValidator = [
  check("id")
    .notEmpty()
    .withMessage("Please provide job id")
    .isNumeric()
    .withMessage("Job id must be a number")
    .trim(),

  check("title")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Job title can not exceed 100 characters")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Requirements must be a string")
    .isLength({ min: 20 })
    .withMessage("Requirements must be at least 20 characters")
    .trim(),

  check("requirements")
    .optional()
    .isString()
    .withMessage("Requirements must be a string")
    .isLength({ min: 20 })
    .withMessage("Requirements must be at least 20 characters")
    .trim(),

  check("workplace")
    .optional()
    .isIn(["remote", "office", "hybrid"])
    .withMessage("Please provide valid workplace")
    .trim(),

  check("salaryRangeMin")
    .optional()
    .isNumeric()
    .withMessage("Salary must be a number")
    .trim(),

  check("salaryRangeMax")
    .optional()
    .isNumeric()
    .withMessage("Salary must be a number")
    .trim(),

  check("hideSalary")
    .optional()
    .isBoolean()
    .withMessage("Please provide valid hide salary value")
    .trim(),

  check("minExperience")
    .optional()
    .isNumeric()
    .withMessage("Experience must be a number")
    .trim(),

  check("careerLevel")
    .optional()
    .isIn([
      "student",
      "entry level",
      "experienced/senior",
      "manager/lead",
      "executive",
    ])
    .withMessage("Please provide valid career level")
    .trim(),

  check("type")
    .optional()
    .isIn([
      "full-time",
      "part-time",
      "internship",
      "freelance/project",
      "shift-based",
      "volunteering",
      "student-activity",
    ])
    .withMessage("Please provide valid job type")
    .trim(),

  check("country")
    .optional()
    .isString()
    .withMessage("Country must be a string")
    .trim(),

  check("city")
    .optional()
    .isString()
    .withMessage("City must be a string")
    .trim(),

  check("openPositions")
    .optional()
    .isNumeric()
    .withMessage("Open positions must be a number")
    .trim(),

  // keywords is a string of comma separated values (e.g. "javascript, react, frontend")
  check("keywords")
    .optional()
    .isString()
    .withMessage("Keywords must be a string")
    .custom((value) => {
      if (value.split(",").length < 2) {
        return Promise.reject("Please provide at least 2 keywords");
      }

      if (value.split(",").some((keyword) => keyword.trim().length < 2)) {
        return Promise.reject("Keywords must be at least 2 characters long");
      }

      return true;
    })
    .trim(),

  check("categoriesId")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Categories must be an array of at least 1 category id")
    .trim(),

  validatorError,
];
