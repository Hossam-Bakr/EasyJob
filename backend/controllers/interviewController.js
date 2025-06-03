const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");
const Interview = require("../models/interviewModel");
const User = require("../models/userModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const interviewInclude = [
  {
    model: Job,
    attributes: ["id", "title"],
  },
  {
    model: User,
    attributes: ["id", "firstName", "lastName", "email"],
  },
];

exports.getInterviews = factory.getAll(Interview, interviewInclude);

exports.getInterview = catchAsync(async (req, res) => {
  const interview = await req.company.getInterviews({
    where: { id: req.params.id },
    include: interviewInclude,
  });

  if (!interview.length) {
    return next(new ApiError("Interview not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      interview: interview[0],
    },
  });
});

exports.scheduleInterview = catchAsync(async (req, res) => {
  const application = await Application.findByPk(req.body.applicationId);

  if (!application) {
    return next(new ApiError("No application found with that ID", 404));
  }

  req.body.JobId = application.JobId;
  req.body.UserId = application.UserId;
  const interview = await req.company.createInterview(req.body);

  application.status = "Accepted";
  await application.save();

  res.status(201).json({
    status: "success",
    data: {
      interview,
    },
  });
});

exports.updateInterview = catchAsync(async (req, res) => {
  const interview = await req.company.getInterviews({
    where: { id: req.params.id },
  });

  if (!interview.length) {
    return next(new ApiError("Interview not found", 404));
  }

  await interview[0].update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      interview: interview[0],
    },
  });
});
