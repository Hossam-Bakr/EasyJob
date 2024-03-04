const express = require("express");

const authController = require("../controllers/authController");
const jobController = require("../controllers/jobController");
const {
  createJobValidator,
  updateJobValidator,
  addJobQuestionsValidator,
  updateJobQuestionValidator,
  applyForJobValidator,
  updateApplicationStatusValidator,
  changeApplicationStageValidator,
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

// Saved Jobs
router.use("/saved", authController.protect, authController.restrictTo("user"));

router
  .route("/saved")
  .get(jobController.getAllSavedJobs)
  .post(jobController.saveJob);
router.delete("/saved/:savedJobId", jobController.deleteSavedJob);

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

// Apply for job

router.post(
  "/:jobId/apply",
  authController.protect,
  authController.restrictTo("user"),
  applyForJobValidator,
  jobController.uploadVoiceAnswers,
  jobController.applyForJob
);

// Questions

router.use(authController.protect, authController.restrictTo("company"));

router
  .route("/:jobId/questions")
  .post(addJobQuestionsValidator, jobController.addJobQuestions);

router
  .route("/:jobId/questions/:id")
  .put(updateJobQuestionValidator, jobController.updateJobQuestion)
  .delete(jobController.deleteJobQuestion);

// Applications

router.route("/:jobId/applications").get(jobController.getJobApplications);

router.route("/:jobId/applications/:id").get(jobController.getJobApplication);
// .delete(jobController.deleteJobApplication);

router.patch(
  "/:jobId/applications/:id/status",
  updateApplicationStatusValidator,
  jobController.updateApplicationStatus
);

router.patch(
  "/:jobId/applications/:id/stage",
  changeApplicationStageValidator,
  jobController.changeApplicationStage
);

module.exports = router;
