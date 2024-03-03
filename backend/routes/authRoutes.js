const express = require("express");
const passport = require('passport');



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




// google auth routes
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
router.get('/google/callback',  authController.loginWithGoogle);




router.post("/login", loginValidator, authController.Login);


router.post("/forgotPassword", authController.forgotPassword);

router.post("/verifyPassResetCode", authController.verifyPassResetCode);
router.put("/resetPassword", ResetPassValidator , authController.resetPassword); 


// router.post("/company/forgotPassword", authController.forgotPassword('Company'));

// router.post("/company/verifyPassResetCode", authController.verifyPassResetCode('Company'));

// router.put("/company/resetPassword",ResetPassValidator, authController.resetPassword('Company')); 


module.exports = router;
