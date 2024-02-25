const express = require("express");

const authController = require("../controllers/authController");
const {
  userSignupValidator,
  companySignupValidator,
  loginValidator,
  userResetPassValidator,
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
router.post("/verifyPassResetCode", authController.verifyPassResetCode);
router.put(
  "/resetPassword",
  userResetPassValidator,
  authController.resetPassword
);

module.exports = router;
