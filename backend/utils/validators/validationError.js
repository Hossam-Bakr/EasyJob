const { validationResult } = require("express-validator");
const ApiError = require("../ApiError");

const validatorError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    const error = new ApiError(
      `Validation error: ${errors.array()[0].msg}`,
      400
    );
    error.errors = errors.array();
    return next(error);
  }
  next();
};

module.exports = validatorError;
