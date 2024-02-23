const express = require("express");

const authController = require("../controllers/authController");
const {
  userSignupValidator,
  companySignupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();

router.post("/user/signup", userSignupValidator, authController.userSignup);
router.post(
  "/company/signup",
  companySignupValidator,
  authController.companySignup
);
router.post("/login", loginValidator, authController.Login);
router.post("/forgotPassword", authController.forgotPassword);

module.exports = router;
