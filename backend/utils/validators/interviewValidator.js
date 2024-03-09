const { check } = require("express-validator");
const validatorError = require("./validationError");

exports.scheduleInterviewValidator = [
  check("applicationId")
    .notEmpty()
    .withMessage("Please provide application id")
    .isNumeric()
    .withMessage("Application id must be a number"),

  check("interviewDate")
    .notEmpty()
    .withMessage("Please provide interview date")
    .isDate()
    .withMessage("Please provide valid interview date")
    .isAfter(new Date().toISOString())
    .withMessage("Interview date must be in the future"),

  check("interviewTime")
    .notEmpty()
    .withMessage("Please provide interview time")
    .isTime()
    .withMessage("Please provide valid interview time"),

  check("address")
    .notEmpty()
    .withMessage("Please provide interview address")
    .isString()
    .withMessage("Address must be a string")
    .trim(),

  check("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string")
    .trim(),

  validatorError,
];

exports.updateInterviewValidator = [
  check("status")
    .optional()
    .isIn(["Completed", "Canceled"])
    .withMessage("Invalid interview status"),

  check("interviewDate")
    .optional()
    .isDate()
    .withMessage("Please provide valid interview date")
    .isAfter(new Date().toISOString())
    .withMessage("Interview date must be in the future"),

  check("interviewTime")
    .optional()
    .isTime()
    .withMessage("Please provide valid interview time"),

  check("address")
    .optional()
    .isString()
    .withMessage("Address must be a string")
    .trim(),

  check("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string")
    .trim(),

  validatorError,
];
