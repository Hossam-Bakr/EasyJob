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


// sign up 
router.post("/user/signup", userSignupValidator, authController.userSignup);
router.post("/company/signup", companySignupValidator, authController.companySignup);

// google auth routes 
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
router.get('/google/callback',  authController.loginWithGoogle);


// login with email and password
router.post("/login", loginValidator, authController.Login);


//change password routes 
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyPassResetCode", authController.verifyPassResetCode);
router.put("/resetPassword", ResetPassValidator , authController.resetPassword); 



module.exports = router;
