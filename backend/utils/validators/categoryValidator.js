const { check } = require("express-validator");
const validatorError = require("./validationError");

exports.createCategoryValidator = [
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

exports.updateCategoryValidator = [
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
