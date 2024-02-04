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
/**
      there is a problem in   // authController.protect,
                             // authController.restrictTo("company"),
                            // createJobValidator,
      we will fix it later😊
 */

router
  .route("/")
  .get(jobController.getAllJobs)
  .post(
    // authController.protect,
    // authController.restrictTo("company"),
    // createJobValidator,
    jobController.createJobWithCategories
  );

router
  .route("/:id")
  .get(getJobValidator, jobController.getJob)
  .patch(
    // authController.protect,
    // authController.restrictTo("company"),
    // updateJobValidator,
    jobController.updateJob
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("company", "admin"),
    // deleteJobValidator,
    jobController.deleteJob
  );

module.exports = router;
