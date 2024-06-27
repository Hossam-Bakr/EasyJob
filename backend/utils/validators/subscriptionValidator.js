const { check } = require("express-validator");
const validatorError = require("./validationError");

exports.createSubscription = [
  check("successUrl")
    .notEmpty()
    .withMessage("successUrl is required")
    .isURL()
    .withMessage("successUrl must be a valid URL"),

  check("cancelUrl")
    .notEmpty()
    .withMessage("cancelUrl is required")
    .isURL()
    .withMessage("cancelUrl must be a valid URL"),

  check("priceId")
    .notEmpty()
    .withMessage("priceId is required")
    .isString()
    .withMessage("priceId must be a string"),

  validatorError,
];

exports.updateSubscription = [
  check("returnUrl")
    .notEmpty()
    .withMessage("returnUrl is required")
    .isURL()
    .withMessage("returnUrl must be a valid URL"),

  validatorError,
];
