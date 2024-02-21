const { check } = require("express-validator");
const validatorError = require("./validationError");

exports.createIndustryValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error("Name cannot contain numbers");
      }
      return true;
    }),

  validatorError,
];

exports.updateIndustryValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error("Name cannot contain numbers");
      }
      return true;
    }),

  validatorError,
];
