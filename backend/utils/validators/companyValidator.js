const { check } = require("express-validator");
const validatorError = require("./validationError");

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
    .notEmpty()
    .withMessage("Please provide company size")
    .isIn(["1-10", "11-50", "51-200", "201-500", "500+"])
    .withMessage("Please provide valid company size")
    .trim(),

  check("foundedYear")
    .notEmpty()
    .withMessage("Please provide founded year")
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
    .notEmpty()
    .withMessage("Please provide company location")
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
