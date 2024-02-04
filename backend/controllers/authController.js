const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Company = require("../models/companyModel");
const generateJWT = require("../utils/generateJWT");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../utils/httpStatusText");

exports.userSignup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    skills: req.body.skills,
  });

  const token = generateJWT(newUser._id);

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
    description: req.body.description,
    phone: req.body.phone,
    industry: req.body.industry,
    location: req.body.location,
    founded: req.body.founded,
    size: req.body.size,
  });

  const token = generateJWT(newCompany._id);

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

    const token = generateJWT(user.id);

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
    const token = generateJWT(company.id);

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

  // Check if user(company) still exists
  const user = await User.findById(decoded.id);
  const company = await Company.findById(decoded.id);

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
