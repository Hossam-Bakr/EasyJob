const Job = require("../models/jobModel");
const Company = require("../models/companyModel");
const Category = require("../models/categoryModel");
const JobCategory = require("../models/jobCategoryModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel")
const SavedJob = require("../models/savedJobModel")


exports.getAllJobs = factory.getAll(Job);

exports.getJob = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.id, {
    include: [
      {
        model: Company,
        attributes: ["id", "name", "email", "phone"],
      },
      {
        model: Category,
        attributes: ["id", "name"],
        through: {
          model: JobCategory,
          attributes: [],
        },
      },
    ],
  });

  if (!job) {
    return res.status(404).json({
      status: "fail",
      message: "No job found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      job,
    },
  });
});

exports.createJob = catchAsync(async (req, res) => {
  const job = await req.company.createJob(req.body);

  if (!req.body.categoriesId || req.body.categoriesId.length < 1) {
    return res.status(400).json({
      success: false,
      message: "You must specify at least one category.",
    });
  }

  await job.setCategories(req.body.categoriesId);

  res.status(201).json({
    status: "success",
    data: {
      job,
    },
  });
});

exports.updateJob = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.id);

  if (!job) {
    return res.status(404).json({
      status: "fail",
      message: "No job found with that ID",
    });
  }

  if (job.CompanyId !== req.company.id) {
    return res.status(401).json({
      status: "fail",
      message: "You are not authorized to update this job",
    });
  }

  await job.update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      job,
    },
  });
});

exports.deleteJob = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.id);

  if (!job) {
    return res.status(404).json({
      status: "fail",
      message: "No job found with that ID",
    });
  }

  if (job.CompanyId !== req.company.id) {
    return res.status(401).json({
      status: "fail",
      message: "You are not authorized to delete this job",
    });
  }

  await job.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getLatestJob = catchAsync(async (req, res) => {
  const _limit = Number(req.params.limit);
  const latestJobs = await Job.findAll({
    limit: _limit,
    order: [["createdAt", "DESC"]],
  });
  if (!latestJobs.length) {
    return res
      .status(404)
      .json({ message: "there is no jobs yet", latestJobs });
  }
  res.status(200).json({ status: "success", latestJobs });
});



exports.getAllSavedJobs = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const userWithSavedJobs = await User.findByPk(userId, {
    include: [{
      model: Job,
      as: 'Jobs',
      through: { attributes: ['createdAt'] }, 
      include: [
        { model: Company, attributes: ['name'] },
        { model: Category, attributes: ['name'], through: { attributes: [] } }
      ]
    }]
  });

  if (!userWithSavedJobs) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found'
    });
  }

  const jobs = userWithSavedJobs.Jobs ; 

  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: { jobs }
  });
});


exports.deleteSavedJob = catchAsync(async (req, res, next) => {
  const { savedJobId } = req.params; 
  const userId = req.user.id;

  const savedJob = await SavedJob.findOne({
    where: {
      id: savedJobId,
      UserId: userId 
    }
  });

  if (!savedJob) {
    return res.status(404).json({
      status: 'fail',
      message: 'No saved job found with that ID for the current user'
    });
  }

  await savedJob.destroy();

  res.status(200).json({
    status: 'success',
    data: null 
  });
});
