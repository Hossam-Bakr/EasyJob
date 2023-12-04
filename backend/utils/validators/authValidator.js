const { check } = require("express-validator");
const validatorError = require("./validationError");
const User = require("../../models/userModel");
const Company = require("../../models/companyModel");

exports.userSignupValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("First name must be between 3 to 20 characters")
    .trim(),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name must be between 3 to 20 characters")
    .trim(),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email already exists");
      }

      const company = await Company.findOne({ email: value });
      if (company) {
        return Promise.reject("Email already exists");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain a uppercase letter"),

  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Must be a valid phone number")
    .trim(),

  check("role").isEmpty().withMessage("Role is not allowed"),

  validatorError,
];

exports.companySignupValidator = [
  check("name")
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Company name must be between 3 to 50 characters")
    .trim(),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email already exists");
      }

      const company = await Company.findOne({ email: value });
      if (company) {
        return Promise.reject("Email already exists");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain a uppercase letter"),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 300 })
    .withMessage("Description must be between 10 to 300 characters")
    .trim(),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Must be a valid phone number")
    .trim(),

  check("industry").notEmpty().withMessage("Industry is required").trim(),

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

  check("founded")
    .optional()
    .isDate()
    .withMessage("Founded must be a valid date")
    .trim(),

  check("size")
    .optional()
    .isIn(["1-10", "11-50", "51-200", "201-500", "500+"])
    .withMessage("Invalid size")
    .trim(),

  check("role").isEmpty().withMessage("Role is not allowed"),

  validatorError,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password").notEmpty().withMessage("Password is required"),

  validatorError,
];
