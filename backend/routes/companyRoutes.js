const express = require("express");
const router = express.Router();

const companyController = require("../controllers/companyController");
const authController = require("../controllers/authController");

router.use(authController.protect, authController.restrictTo("company"));

router.route("/profile").get(companyController.getCompanyProfile);
router.patch(
  "/profile/media",
  companyController.uploadCompanyMedia,
  companyController.updateCompanyMedia
);
router.patch("/profile/info", companyController.updateCompanyInfo);
router.patch(
  "/profile/online-presence",
  companyController.updateOnlinePresence
);

module.exports = router;
