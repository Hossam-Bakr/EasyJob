const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const industryController = require("../controllers/industryController");
const industryValidator = require("../utils/validators/industryValidator");
const categoryRoutes = require("./categoryRoutes");

router.get("/", industryController.getAllIndustries);
router.get("/:id", industryController.getIndustry);

// GET /industries/:industryId/categories (get all categories for an industry)
// POST /industries/:industryId/categories (create a category for an industry)
router.use("/:industryId/categories", categoryRoutes);

// Protect all routes after this middleware (only admin have access to these routes)
router.use(authController.protect, authController.restrictTo("admin"));

router.post(
  "/",
  industryValidator.createIndustryValidator,
  industryController.createIndustry
);

router
  .route("/:id")
  .put(
    industryValidator.updateIndustryValidator,
    industryController.updateIndustry
  )
  .delete(industryController.deleteIndustry);

module.exports = router;
