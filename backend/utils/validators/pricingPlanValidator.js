const { check } = require("express-validator");
const validatorError = require("./validationError");

exports.createPlanValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isIn(["Silver", "Golden", "Platinum"])
    .withMessage("Invalid plan name"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  check("interval")
    .notEmpty()
    .withMessage("Interval is required")
    .isIn(["month", "year"])
    .withMessage("Invalid interval (month - year)"),

  check("allowedJobPosts")
    .notEmpty()
    .withMessage("Number of allowed job posts is required")
    .isInt()
    .withMessage("Number of allowed job posts must be an integer"),

  check("allowedUnlocks")
    .notEmpty()
    .withMessage("Number of allowed unlocks is required")
    .isInt()
    .withMessage("Number of allowed unlocks must be an integer"),

  check("allowedInvitations")
    .notEmpty()
    .withMessage("Number of allowed invitations is required")
    .isInt()
    .withMessage("Number of allowed invitations must be an integer"),

  validatorError,
];

exports.updatePlanValidator = [
  check("name")
    .optional()
    .isIn(["Silver", "Golden", "Platinum"])
    .withMessage("Invalid plan name"),

  check("price").optional().isNumeric().withMessage("Price must be a number"),

  check("interval")
    .optional()
    .isIn(["month", "year"])
    .withMessage("Invalid interval (month - year)"),

  check("allowedJobPosts")
    .optional()
    .isInt()
    .withMessage("Number of allowed job posts must be an integer"),

  check("allowedUnlocks")
    .optional()
    .isInt()
    .withMessage("Number of allowed unlocks must be an integer"),

  check("allowedInvitations")
    .optional()
    .isInt()
    .withMessage("Number of allowed invitations must be an integer"),

  validatorError,
];
