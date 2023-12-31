const express = require("express");

const authController = require("../controllers/authController");
const jobController = require("../controllers/jobController");
const {
  getJobValidator,
  createJobValidator,
  updateJobValidator,
  deleteJobValidator,
} = require("../utils/validators/jobValidator");

const router = express.Router();

router
  .route("/")
  .get(jobController.getAllJobs)
  .post(
    authController.protect,
    authController.restrictTo("company"),
    createJobValidator,
    jobController.createJob
  );

router
  .route("/:id")
  .get(getJobValidator, jobController.getJob)
  .patch(
    authController.protect,
    authController.restrictTo("company"),
    updateJobValidator,
    jobController.updateJob
  )
  .delete(
    authController.protect,
    authController.restrictTo("company", "admin"),
    deleteJobValidator,
    jobController.deleteJob
  );

module.exports = router;
