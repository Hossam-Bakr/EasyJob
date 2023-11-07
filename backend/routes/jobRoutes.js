const express = require("express");

const authController = require("../controllers/authController");
const jobController = require("../controllers/jobController");

const router = express.Router();

router
  .route("/")
  .get(jobController.getAllJobs)
  .post(
    authController.protect,
    authController.restrictTo("company"),
    jobController.createJob
  );

router
  .route("/:id")
  .get(jobController.getJob)
  .patch(
    authController.protect,
    authController.restrictTo("company"),
    jobController.updateJob
  )
  .delete(
    authController.protect,
    authController.restrictTo("company", "admin"),
    jobController.deleteJob
  );

module.exports = router;
