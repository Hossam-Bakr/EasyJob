const express = require("express");
const router = express.Router();

const skillController = require("../controllers/skillController");
const authController = require("../controllers/authController");
const skillValidator = require("../utils/validators/skillValidator");

router.get("/", skillController.getAllSkills);
router.get("/:id", skillController.getSkill);

router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/")
  .post(skillValidator.createSkillValidator, skillController.createSkill);

router
  .route("/:id")
  .patch(skillValidator.updateSkillValidator, skillController.updateSkill)
  .delete(skillController.deleteSkill);

module.exports = router;
