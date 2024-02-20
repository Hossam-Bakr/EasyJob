const { check } = require("express-validator");
const validatorError = require("./validationError");

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
    .normalizeEmail(),

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
    .withMessage("Password must contain an uppercase letter"),

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
    .withMessage("Must be a valid email address"),

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
    .withMessage("Password must contain an uppercase letter"),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Must be a valid phone number")
    .trim(),

  check("industry")
    .notEmpty()
    .withMessage("Industry is required")
    .isInt()
    .withMessage("Industry must be a number")
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
