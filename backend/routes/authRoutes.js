const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");
const {
  userSignupValidator,
  companySignupValidator,
  loginValidator,
  ResetPassValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();

//---------- ---------------sign up ------------------------------------
router.post("/user/signup", userSignupValidator, authController.userSignup);
router.post(
  "/company/signup",
  companySignupValidator,
  authController.companySignup
);

//---------- login with email and password ---------------
router.post("/login", loginValidator, authController.Login);

//---------- change password routes---------------
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyPassResetCode", authController.verifyPassResetCode);
router.put("/resetPassword", ResetPassValidator, authController.resetPassword);



//--------------------google auth routes ------------------------
router.get("/login/success", authController.loginSuccessWithGoogle);

router.get("/login/failed", authController.loginFailedWithGoogle);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    // if successful authentication redirect to /login/success
    res.redirect(process.env.CLIENT_URL);
  }
);
router.get('/logout', authController.logout);


module.exports = router;
