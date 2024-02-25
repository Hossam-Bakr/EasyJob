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

exports.userSignup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  await newUser.createUserProfile();

  const token = generateJWT(newUser.email);

  newUser.password = undefined;

  res.status(201).json({
    status: httpStatusText.SUCCESS,
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

  const companyProfile = await newCompany.createCompanyProfile();

  const token = generateJWT(newCompany.email);

  newCompany.password = undefined;

  res.status(201).send({
    status: httpStatusText.SUCCESS,
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

  const user = await User.findOne({ where: { email } });
  const company = await Company.findOne({ where: { email } });

  if (!user && !company) {
    return next(new ApiError("User not found", 404));
  }

  if (user) {
    const isPasswordCorrect = await user.correctPassword(password);

    if (!isPasswordCorrect) {
      return next(new ApiError("Incorrect email or password", 401));
    }

    const token = generateJWT(user.email);

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
  } else if (company) {
    const isPasswordCorrect = await company.correctPassword(password);

    if (!isPasswordCorrect) {
      return next(new ApiError("Incorrect email or password", 401));
    }
    const token = generateJWT(company.email);

    res.status(200).json({
      status: "success",
      token,
      data: {
        company: {
          ...company.toJSON(),
          password: undefined,
        },
      },
    });
  }
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    throw new Error(`there is no user with this email  ${req.body.email}`);
  }
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex")
    .trim();

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpire = Date.now() + 15 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();

  const message = `Hi ${user.firstName} \n we recieved a request to reset your password on your easyjob account \n ${resetCode} \n Enter this code to reset your password on your easyjob account \n thank for helping us to make your account secure ☺️`;
  try {
    await sendEmail(user, resetCode);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "failed", message: err.message });
  }

  res
    .status(200)
    .json({ status: "success", message: "You have got a reset code , check your email to reset password" });
});

exports.verifyPassResetCode = catchAsync(async (req, res, next) => {
  const resetCode = req.body.resetCode;
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex")
    .trim();
  const user = await User.findOne({
    where: {
      passwordResetCode: hashedResetCode,
      passwordResetExpire: { [Op.gt]: Date.now() },
    },
  });
  if (!user) {
    throw new Error(`Reset code ${req.body.resetCode} invalid or expired`);
  }
  user.passwordResetVerified = true;
  user.save();
  res.status(200).json({
    status: "success",
    message: "password reset code verified successfully",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    throw new Error(`there is no user with this email  ${req.body.email}`);
  }

  if (!user.passwordResetVerified) {
    throw new Error(`password reset code not verified`);
  }

  user.password = req.body.newPassword;
  user.passwordResetVerified = false;
  user.passwordResetExpire = null;
  user.passwordResetCode = null;

  const token = await generateJWT(user.id);

  user.save();
  res.status(200).json({ status: "success", token });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new ApiError("You are not logged in! Please log in to get access.", 401)
    );

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
