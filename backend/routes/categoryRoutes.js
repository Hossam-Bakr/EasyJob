const express = require("express");
const router = express.Router({ mergeParams: true });

const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");
const categoryValidator = require("../utils/validators/categoryValidator");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

// Protect all routes after this middleware (only admin have access to these routes)
router.use(authController.protect, authController.restrictTo("admin"));

router.post(
  "/",
  categoryController.setIndustryId,
  categoryValidator.createCategoryValidator,
  categoryController.createCategory
);

router
  .route("/:id")
  .put(
    categoryValidator.updateCategoryValidator,
    categoryController.updateCategory
  )
  .delete(categoryController.deleteCategory);

module.exports = router;
