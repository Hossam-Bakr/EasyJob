const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");
const {
  userSignupValidator,
  companySignupValidator,
  loginValidator,
  ResetPassValidator,
} = require("../utils/validators/authValidator");
const signToken = require("../utils/generateJWT");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const router = express.Router();

// sign up
router.post("/user/signup", userSignupValidator, authController.userSignup);
router.post(
  "/company/signup",
  companySignupValidator,
  authController.companySignup
);

// login with email and password
router.post("/login", loginValidator, authController.Login);

//change password routes
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyPassResetCode", authController.verifyPassResetCode);
router.put("/resetPassword", ResetPassValidator, authController.resetPassword);

//--------------------google auth routes ------------------------

router.get("/login/success", authController.loginSuccess);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    // Successful authentication, redirect success.
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); 
      res.redirect("http://localhost:3001/login"); 
    });
  });
});

module.exports = router;
