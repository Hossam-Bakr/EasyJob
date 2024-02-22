const { check, body } = require("express-validator");
const validatorError = require("./validationError");
const bcrypt = require("bcryptjs");

exports.updateCompanyInfoValidator = [
  check("country")
    .notEmpty()
    .withMessage("Please provide country")
    .isString()
    .withMessage("Country must be a string")
    .isLength({ max: 50 })
    .withMessage("Country cannot exceed 50 characters")
    .trim(),

  check("city")
    .notEmpty()
    .withMessage("Please provide city")
    .isString()
    .withMessage("City must be a string")
    .isLength({ max: 50 })
    .withMessage("City cannot exceed 50 characters")
    .trim(),

  check("size")
    .optional()
    .isIn(["1-10", "11-50", "51-200", "201-500", "500+"])
    .withMessage("Please provide valid company size")
    .trim(),

  check("foundedYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage("Please provide valid founded year")
    .trim(),

  check("description")
    .notEmpty()
    .withMessage("Please provide company description")
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  check("location")
    .optional()
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
        return Promise.reject("Invalid location coordinates");
      }

      const [longitude, latitude] = value.coordinates;
      if (isNaN(longitude) || isNaN(latitude)) {
        return Promise.reject("Invalid location coordinates");
      }

      return true;
    }),

  validatorError,
];

exports.updateCompanyLinksValidator = [
  check("website")
    .optional()
    .isURL()
    .withMessage("Please provide valid website link")
    .trim(),

  check("linkedin")
    .optional()
    .isURL()
    .withMessage("Please provide valid linkedin link")
    .trim(),

  check("facebook")
    .optional()
    .isURL()
    .withMessage("Please provide valid facebook link")
    .trim(),

  check("twitter")
    .optional()
    .isURL()
    .withMessage("Please provide valid twitter link")
    .trim(),

  check("instagram")
    .optional()
    .isURL()
    .withMessage("Please provide valid instagram link")
    .trim(),

  check("youtube")
    .optional()
    .isURL()
    .withMessage("Please provide valid youtube link")
    .trim(),

  check("blog")
    .optional()
    .isURL()
    .withMessage("Please provide valid blog link")
    .trim(),

  check("behance")
    .optional()
    .isURL()
    .withMessage("Please provide valid behance link")
    .trim(),

  check("vimeo")
    .optional()
    .isURL()
    .withMessage("Please provide valid vimeo link")
    .trim(),

  validatorError,
];

exports.updateSpecializationsValidator = [
  body("specializations")
    .notEmpty()
    .withMessage("Please provide specializations")
    .isArray()
    .withMessage("Specializations must be an array")
    .custom((value) => {
      if (value.length === 0) {
        return Promise.reject("Specializations cannot be empty");
      }

      return true;
    })
    .custom((value) => {
      for (const id of value) {
        if (isNaN(id) || id < 1) {
          return Promise.reject("Invalid specialization id");
        }
      }

      return true;
    }),

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

  body("confirm_newPassword")
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
      const company = req.company;
      if (!company) {
        throw new Error("You are not authenticated");
      }

      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        company.password
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
