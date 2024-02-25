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

// Questions

router.use(authController.protect, authController.restrictTo("company"));

router.route("/:jobId/questions").post(jobController.addJobQuestion);

router
  .route("/:jobId/questions/:id")
  .put(jobController.updateJobQuestion)
  .delete(jobController.deleteJobQuestion);

module.exports = router;
