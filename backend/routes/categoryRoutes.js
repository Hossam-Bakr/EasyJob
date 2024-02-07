const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

// Protect all routes after this middleware (only admin have access to these routes)
router.use(authController.protect, authController.restrictTo("admin"));

router.post("/", categoryController.createCategory);

router
  .route("/:id")
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
