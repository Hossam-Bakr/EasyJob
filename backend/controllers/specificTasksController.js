const User = require("../models/userModel");
const Job = require("../models/jobModel");
const Company = require("../models/companyModel");

const catchAsync = require("../utils/catchAsync");

exports.displayCounts = catchAsync(async (req, res, next) => {
  const userCount = await User.count();
  const jobCount = await Job.count();
  const companyCount = await Company.count();

  res.json({
    status: "success",
    data: {
      users: userCount,
      jobs: jobCount,
      companies: companyCount,
    },
  });
});
