const { check } = require("express-validator");
const validatorError = require("./validationError");

exports.createSkillValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  validatorError,
];

exports.updateSkillValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  validatorError,
];
