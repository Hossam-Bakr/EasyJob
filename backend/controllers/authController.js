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
    return next(new ApiError("User not found", 404));
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

  const message = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }
.container {
  width: 80% !important; 
  margin : 25px auto ; 

}

    .header {
      background-color: #005a9c;
      color: white;
      padding: 20px 0;
      text-align: center;
      padding: 40px 20px;

    }
    .content {
      padding: 40px 20px;
      background-color: #eee;
      text-align: left;
      position: relative  !important;
    }
    .footer {
      text-align: center;
      padding: 20px 20px;
      font-size: 0.8em;
      color: #fff;
      background-color: black ;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #005a9c;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .logoImg {
      width: 180px;
      position: absolute;
      top: 0px !important;
      left: 0px  !important;
      margin-bottom: 15px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  </style>
  </head>
  <body>
   <div class="container"> 
    <div class="header">
   <h1>EasyJob Password Reset</h1>
 </div>
 <div class="content">
  <img class="logoImg" src="cid:unique@nodemailer.com"/>
   <h2>Hello, ${user.firstName}</h2>
   <p>We received a request to reset your password for your EasyJob account. Please use the code below to proceed.</p>
   <div style=" padding: 10px; margin: 8px 0; font-weight : bold ; text-align:left ; ">
     <h3 style="color: #005a9c;">Reset Code: ${resetCode}</h3>
   </div>
   <p>Enter this code on the password reset page to create a new password for your account.</p>
 </div>
 <div class="footer">
   Thank you for helping us to keep your account secure.
   <br>
   If you didn't request this, please ignore this email.
 </div>
 </div>
  </body>
  </html>
  `;

  try {
    await sendEmail(user, "Password Reset Code (valid for 15 min)", message);
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpire = undefined;
    user.passwordResetVerified = false;

    await user.save();

    return next(
      new ApiError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }

  res.status(200).json({
    status: "success",
    message: "You have got a reset code , check your email to reset password",
  });
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
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code not verified.", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetVerified = false;
  user.passwordResetExpire = undefined;
  user.passwordResetCode = undefined;

  const token = generateJWT(user.id);

  await user.save();

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
