const express = require("express");
const router = express.Router();

const pricingPlanController = require("../controllers/pricingPlanController");
const authController = require("../controllers/authController");
const pricingPlanValidator = require("../utils/validators/pricingPlanValidator");

router.get("/", pricingPlanController.getAllPlans);
router.get("/:id", pricingPlanController.getPlan);

router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/")
  .post(
    pricingPlanValidator.createPlanValidator,
    pricingPlanController.createPlan
  );

router
  .route("/:id")
  .patch(
    pricingPlanValidator.updatePlanValidator,
    pricingPlanController.updatePlan
  )
  .delete(pricingPlanController.deletePlan);

module.exports = router;
