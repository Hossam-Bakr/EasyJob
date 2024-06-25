const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const subscriptionController = require("../controllers/subscriptionController");
const subscriptionValidator = require("../utils/validators/subscriptionValidator");

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  subscriptionController.webhookCheckout
);

router.use(authController.protect, authController.restrictTo("company"));

router
  .route("/")
  .get(subscriptionController.getSubscription)
  .post(
    subscriptionValidator.createSubscription,
    subscriptionController.createSubscription
  )
  .patch(
    subscriptionValidator.updateSubscription,
    subscriptionController.updateSubscription
  );

// router.route("/:id").get(subscriptionController.getSubscription)
//   .patch(subscriptionController.updateSubscription)
//   .delete(subscriptionController.deleteSubscription);

module.exports = router;
