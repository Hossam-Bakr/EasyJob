const { Op } = require("sequelize");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Company = require("../models/companyModel");
const generateJWT = require("../utils/generateJWT");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../utils/httpStatusText");
const sendEmail = require("../utils/sendEmail");
const createResetCodeMessage = require("../utils/createResetCodeMessage");
const signToken = require("../utils/generateJWT");

exports.userSignup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  const token = generateJWT(newUser.email);

  newUser.password = undefined;

  // Create the user profile asynchronously
  setImmediate(() => {
    newUser.createUserProfile().catch((error) => {
      console.error("Error creating user profile:", error);
    });
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.companySignup = catchAsync(async (req, res, next) => {
  const newCompany = await Company.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    IndustryId: req.body.industryId,
  });

  const token = generateJWT(newCompany.email);

  newCompany.password = undefined;

  // Create the company profile asynchronously
  setImmediate(() => {
    newCompany.createCompanyProfile().catch((error) => {
      console.error("Error creating company profile:", error);
    });
  });

  res.status(201).send({
    status: "success",
    token,
    data: {
      company: newCompany,
    },
  });
});

exports.Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError("Please provide email and password", 400));
  }

  const [user, company] = await Promise.all([
    User.findOne({ where: { email } }),
    Company.findOne({ where: { email } }),
  ]);

  if (!user && !company) {
    return next(new ApiError("User not found", 404));
  }

  const account = user || company;
  const isPasswordCorrect = await account.correctPassword(password);

  if (!isPasswordCorrect) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  const token = generateJWT(account.email);

  res.status(200).json({
    status: "success",
    token,
    data: {
      [user ? "user" : "company"]: {
        ...account.toJSON(),
        password: undefined,
      },
    },
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const [user, company] = await Promise.all([
    User.findOne({ where: { email } }),
    Company.findOne({ where: { email } }),
  ]);

  const entity = user || company;

  if (!entity) {
    return next(new ApiError("Account with this email not found", 404));
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex")
    .trim();

  entity.passwordResetCode = hashedResetCode;
  entity.passwordResetExpire = Date.now() + 15 * 60 * 1000;
  entity.passwordResetVerified = false;
  await entity.save();

  const message = createResetCodeMessage(
    entity.firstName || entity.name,
    resetCode
  );

  try {
    await sendEmail(
      entity.email,
      "Password Reset Code (valid for 15 min)",
      message
    );
  } catch (err) {
    entity.passwordResetCode = undefined;
    entity.passwordResetExpire = undefined;
    entity.passwordResetVerified = false;
    await entity.save();

    return next(
      new ApiError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }

  res.status(200).json({
    status: "success",
    message:
      "You have received a reset code, check your email to reset your password",
  });
});

exports.verifyPassResetCode = catchAsync(async (req, res, next) => {
  const { entityType, resetCode } = req.body;
  const Model = entityType === "Company" ? Company : User;

  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex")
    .trim();

  const user = await Model.findOne({
    where: {
      passwordResetCode: hashedResetCode,
      passwordResetExpire: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    return next(new ApiError("Reset code invalid or expired", 400));
  }

  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "password reset code verified successfully",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email, newPassword, entityType } = req.body;
  const Model = entityType === "Company" ? Company : User;
  const entity = await Model.findOne({ where: { email: email } });
  if (!entity) {
    return next(new ApiError(`${entityType} not found`, 404));
  }

  if (!entity.passwordResetVerified) {
    return next(new ApiError("Reset code not verified.", 400));
  }

  entity.password = newPassword;
  entity.passwordResetVerified = false;
  entity.passwordResetExpire = undefined;
  entity.passwordResetCode = undefined;

  const token = generateJWT(entity.id);

  await entity.save();

  res.status(200).json({ status: "success", token });
});

// ------ google auth --------------
exports.loginSuccessWithGoogle = catchAsync(async (req, res, next) => {
  if (req.user) {
    const user = req.user;
    const token = signToken(user.email);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          ...user.toJSON(),
          password: undefined,
        },
      },
    });
  } else {
    return next(new ApiError("Not Authorized", 403));
  }
});

exports.loginFailedWithGoogle = catchAsync(async (req, res, next) => {
  return next(new ApiError("failed to login with google", 401));
});

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.redirect(
        process.env.LOGOUT_REDIRECT_URL || "http://localhost:3001/login"
      );
    });
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new ApiError("Please log in to get access.", 401));

  // Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ where: { email: decoded.email } });
  const company = await Company.findOne({ where: { email: decoded.email } });

  if (!user && !company)
    return next(new ApiError("This account does no longer exist.", 404));

  // Check if user(company) change his password after token created
  if (user) {
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new ApiError(
          "User recently changed password! Please log in again.",
          401
        )
      );
    }
  } else if (company) {
    if (company.changedPasswordAfter(decoded.iat)) {
      return next(
        new ApiError(
          "Company recently changed password! Please log in again.",
          401
        )
      );
    }
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  if (user) {
    req.user = user;
  } else if (company) {
    req.company = company;
  }

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (req.user) {
      if (!roles.includes(req.user.role)) {
        return next(
          new ApiError("You do not have permission to perform this action", 403)
        );
      }
    } else if (req.company) {
      if (!roles.includes(req.company.role)) {
        return next(
          new ApiError("You do not have permission to perform this action", 403)
        );
      }
    }

    next();
  };
};
