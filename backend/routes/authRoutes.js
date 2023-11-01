const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post("/user/signup", authController.userSignup);
router.post("/company/signup", authController.companySignup);
router.post("/login", authController.Login);

module.exports = router;
