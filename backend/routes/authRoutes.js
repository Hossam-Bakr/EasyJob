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

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    if (req.user) {
      res.redirect(process.env.CLIENT_URL);
    } else {
      return next(new ApiError("Not Authorized", 403));
    }
  }
);
router.get("/login/success", authController.loginSuccessWithGoogle);

router.get("/login/failed", authController.loginFailedWithGoogle);

router.get("/logout", authController.logout);

module.exports = router;
