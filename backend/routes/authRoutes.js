const express = require("express");

const authController = require("../controllers/authController");
const {
  userSignupValidator,
  companySignupValidator,
  loginValidator,
  ResetPassValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();

router.post("/user/signup", userSignupValidator, authController.userSignup);
router.post(
  "/company/signup",
  companySignupValidator,
  authController.companySignup
);


router.post("/login", loginValidator, authController.Login);


router.post("/user/forgotPassword", authController.forgotPassword('User'));
router.post("/company/forgotPassword", authController.forgotPassword('Company'));

router.post("/user/verifyPassResetCode", authController.verifyPassResetCode('User'));
router.post("/company/verifyPassResetCode", authController.verifyPassResetCode('Company'));

router.put("/user/resetPassword", ResetPassValidator , authController.resetPassword('User')); 
router.put("/company/resetPassword",ResetPassValidator, authController.resetPassword('Company')); // companyResetPassValidator, 


module.exports = router;
