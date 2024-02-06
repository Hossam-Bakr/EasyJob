const jwt = require("jsonwebtoken");
const Company = require("../../models/companyModel");

const authenticateCompany = async (req, res, next) => {
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
  const company = await Company.findByPk(decoded.id);

  if (!user && !company)
    return next(new ApiError("This account does no longer exist.", 404));

  if (company) {
    return res.status(401).json({
      success: false,
      message: "The company belonging to this token no longer exists.",
    });
  }
   next();
};

module.exports = authenticateCompany;
