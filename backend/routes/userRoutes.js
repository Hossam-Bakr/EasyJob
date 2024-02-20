const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const userValidator = require("../utils/validators/userValidator");

router.use(authController.protect, authController.restrictTo("user"));

router.route("/profile").get(userController.getUserProfile);
router.patch(
  "/profile/media",
  userController.uploadUserProfileMedia,
  userController.updateUserProfileMedia
);
router.patch(
  "/profile/info",
  userValidator.updateUserInfoValidator,
  userController.updateUserInfo
);
router.patch(
  "/profile/interests",
  userValidator.updateUserCareerInterestsValidator,
  userController.updateUserCareerInterests
);

// Experience
router.patch(
  "/profile/experience/total",
  userValidator.updateTotalExperienceValidator,
  userController.updateTotalExperience
);
router
  .route("/profile/experience")
  .post(userValidator.addExperienceValidator, userController.addExperience);
router
  .route("/profile/experience/:id")
  .patch(
    userValidator.updateExperienceValidator,
    userController.updateExperience
  )
  .delete(
    userValidator.deleteExperienceValidator,
    userController.deleteExperience
  );

// Education
router
  .route("/profile/education/level")
  .patch(
    userValidator.updateEducationLevelValidator,
    userController.updateEducationLevel
  );
router
  .route("/profile/education")
  .post(userValidator.addEducationValidator, userController.addEducation);
router
  .route("/profile/education/:id")
  .patch(userValidator.updateEducationValidator, userController.updateEducation)
  .delete(
    userValidator.deleteEducationValidator,
    userController.deleteEducation
  );

// Certification
router
  .route("/profile/certification")
  .post(
    userValidator.addCertificationValidator,
    userController.addCertification
  );
router
  .route("/profile/certification/:id")
  .patch(
    userValidator.updateCertificationValidator,
    userController.updateCertification
  )
  .delete(
    userValidator.deleteCertificationValidator,
    userController.deleteCertification
  );

// Language
router
  .route("/profile/language")
  .post(userValidator.addLanguageValidator, userController.addLanguage);
router
  .route("/profile/language/:id")
  .patch(userValidator.updateLanguageValidator, userController.updateLanguage)
  .delete(userValidator.deleteLanguageValidator, userController.deleteLanguage);

// Online Presence
router.patch(
  "/profile/online-presence",
  // userValidator.updateOnlinePresenceValidator,
  userController.updateOnlinePresence
);

router.patch('/changePassword' ,   userValidator.changePasswordValidator , userController.changePassword )
router.delete('/delete-account' , userController.deleteUserAccount )


module.exports = router;
