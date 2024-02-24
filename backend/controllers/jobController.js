const Job = require("../models/jobModel");
const Company = require("../models/companyModel");
const Category = require("../models/categoryModel");
const JobCategory = require("../models/jobCategoryModel");
const Question = require("../models/questionModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.getAllJobs = factory.getAll(Job);

exports.getJob = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.id, {
    include: [
      {
        model: Company,
        attributes: ["id", "name", "email"],
      },
      {
        model: Category,
        attributes: ["id", "name"],
        through: {
          model: JobCategory,
          attributes: [],
        },
      },
      {
        model: Question,
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
  if (!req.body.categoriesId || req.body.categoriesId.length < 1) {
    return res.status(400).json({
      success: false,
      message: "You must specify at least one category.",
    });
  }

  const job = await req.company.createJob(req.body);

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

  if (req.body.categoriesId) {
    await job.setCategories(req.body.categoriesId);
  }

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
