const express = require("express");

const authController = require("../controllers/authController");
const jobController = require("../controllers/jobController");
const {
  createJobValidator,
  updateJobValidator,
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
router.get("/latest/:limit", jobController.getLatestJob);

router
  .route("/:id")
  .get(jobController.getJob)
  .delete(
    authController.protect,
    authController.restrictTo("company", "admin"),
    jobController.deleteJob
  )
  .patch(
    authController.protect,
    authController.restrictTo("company"),
    updateJobValidator,
    jobController.updateJob
  );

module.exports = router;
