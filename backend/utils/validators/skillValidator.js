const { check } = require("express-validator");
const validatorError = require("./validationError");

exports.createSkillValidator = [
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

exports.updateSkillValidator = [
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
