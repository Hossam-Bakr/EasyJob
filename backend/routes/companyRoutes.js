const express = require("express");
const router = express.Router();

const companyController = require("../controllers/companyController");
const {
  getCandidatesByCompanyCategories,
} = require("../controllers/candidateController");
const authController = require("../controllers/authController");
const {
  updateCompanyInfoValidator,
  updateCompanyLinksValidator,
} = require("../utils/validators/companyValidator");

router.use(authController.protect, authController.restrictTo("company"));

router.route("/profile").get(companyController.getCompanyProfile);
router.patch(
  "/profile/media",
  companyController.uploadCompanyMedia,
  companyController.updateCompanyMedia
);
router.patch(
  "/profile/info",
  updateCompanyInfoValidator,
  companyController.updateCompanyInfo
);
router.patch(
  "/profile/online-presence",
  // updateCompanyLinksValidator,
  companyController.updateOnlinePresence
);

router.get("/:companyId/candidates", getCandidatesByCompanyCategories);

module.exports = router;
