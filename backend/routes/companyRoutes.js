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
  updateSpecializationsValidator,
  changePasswordValidator,
  validateEmailChange,
} = require("../utils/validators/companyValidator");

router.get("/", companyController.getAllCompanies);
router.get("/profile/:id", companyController.getCompanyProfileById);

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

// specializations
router.put(
  "/profile/specializations",
  updateSpecializationsValidator,
  companyController.updateSpecializations
);

router.get("/:companyId/candidates", getCandidatesByCompanyCategories);

router.patch(
  "/changePassword",
  changePasswordValidator,
  companyController.changePassword
);
router.delete("/delete-account", companyController.deleteCompanyAccount);

router.patch(
  "/changeEmail",
  validateEmailChange,
  companyController.changeCompanyEmail
);

module.exports = router;
