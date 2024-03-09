const express = require("express");
const router = express.Router({ mergeParams: true });

const authController = require("../controllers/authController");
const interviewController = require("../controllers/interviewController");
const {
  scheduleInterviewValidator,
  updateInterviewValidator,
} = require("../utils/validators/interviewValidator");

router.use(authController.protect, authController.restrictTo("company"));

router
  .route("/")
  .get(interviewController.getInterviews)
  .post(scheduleInterviewValidator, interviewController.scheduleInterview);

router
  .route("/:id")
  .get(interviewController.getInterview)
  .patch(updateInterviewValidator, interviewController.updateInterview);

module.exports = router;
