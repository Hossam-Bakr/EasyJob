const Job = require("../models/jobModel");
const Company = require("../models/companyModel");
const CompanyProfile = require("../models/companyProfileModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const JobCategory = require("../models/jobCategoryModel");
const Skill = require("../models/skillModel");
const RequiredSkill = require("../models/requiredSkillModel");
const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const Application = require("../models/applicationModel");
const SavedJob = require("../models/savedJobModel");
const sequelize = require("../config/database");
const { Op } = require("sequelize");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

const processRequiredSkills = async (requiredSkills, jobId) => {
  const newSkills = requiredSkills
    .filter((skill) => skill.newSkill !== undefined)
    .map((skill) => ({ name: skill.newSkill }));

  if (newSkills.length) {
    // add new skills to the database
    const createdSkills = await Skill.bulkCreate(newSkills, {
      ignoreDuplicates: true,
    });

    // replace newSkill with SkillId
    requiredSkills.forEach((skill) => {
      if (skill.newSkill !== undefined) {
        const newSkill = createdSkills.find(
          (createdSkill) => createdSkill.name === skill.newSkill
        );
        skill.SkillId = newSkill.id;
        delete skill.newSkill;
      }
    });
  }

  const skills = requiredSkills.map((skill) => ({
    ...skill,
    JobId: jobId,
  }));

  return skills;
};

exports.getAllJobs = (req, res, next) => {
  const categories = req.query?.cats ? req.query.cats.split(",") : null;

  const allJobsInclude = [
    {
      model: Company,
      attributes: ["id", "name"],
      include: {
        model: CompanyProfile,
        attributes: ["logo", "country", "city"],
      },
    },
    {
      model: Category,
      attributes: ["id", "name"],
      ...(categories && {
        where: {
          name: {
            [Op.in]: categories,
          },
        },
      }),
      through: {
        model: JobCategory,
        attributes: [],
      },
    },
  ];

  factory.getAll(Job, allJobsInclude)(req, res, next);
};

exports.getJob = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.id, {
    include: [
      {
        model: Company,
        attributes: ["id", "name", "email", "phone"],
        include: {
          model: CompanyProfile,
          attributes: ["logo", "country", "city"],
        },
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
      {
        model: Skill,
        // as: "requiredSkills",
        attributes: ["id", "name"],
        through: {
          model: RequiredSkill,
          attributes: ["minLevel", "minYearsOfExperience"],
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

  const jobData = job.toJSON();

  jobData.RequiredSkills = job.Skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    minLevel: skill.RequiredSkill.minLevel,
    minYearsOfExperience: skill.RequiredSkill.minYearsOfExperience,
  }));

  delete jobData.Skills;

  res.status(200).json({
    status: "success",
    data: {
      job: jobData,
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

  const skills = await processRequiredSkills(req.body.requiredSkills, job.id);
  await RequiredSkill.bulkCreate(skills);

  await req.company.update({ jobPostsUsed: req.company.jobPostsUsed + 1 });

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

  if (req.body.requiredSkills) {
    const skills = await processRequiredSkills(req.body.requiredSkills, job.id);

    await RequiredSkill.destroy({ where: { JobId: job.id } });
    await RequiredSkill.bulkCreate(skills);
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

exports.getJobsForMap = catchAsync(async (req, res) => {
  const jobs = await Job.findAll({
    attributes: [
      "id",
      "title",
      [sequelize.fn("ST_X", sequelize.col("location")), "latitude"],
      [sequelize.fn("ST_Y", sequelize.col("location")), "longitude"],
      "createdAt",
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      jobs,
    },
  });
});

// Questions

exports.addJobQuestions = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.jobId);

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

  const questions = await Promise.all(
    req.body.questions.map((question) => job.createQuestion(question))
  );

  res.status(200).json({
    status: "success",
    data: {
      questions,
    },
  });
});

exports.updateJobQuestion = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.jobId);

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

  const question = await Question.findByPk(req.params.id);

  if (!question) {
    return res.status(404).json({
      status: "fail",
      message: "No question found with that ID",
    });
  }

  const updatedQuestion = await question.update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      question: updatedQuestion,
    },
  });
});

exports.deleteJobQuestion = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.jobId);

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

  const question = await Question.findByPk(req.params.id);

  if (!question) {
    return res.status(404).json({
      status: "fail",
      message: "No question found with that ID",
    });
  }

  await question.destroy();

  res.status(204).json({
    status: "success",
    message: "Question deleted successfully.",
  });
});

// Applications

exports.applyForJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByPk(req.params.jobId);

  if (!job) {
    return res.status(404).json({
      status: "fail",
      message: "No job found with that ID",
    });
  }

  const applicationExists = await Application.findOne({
    where: { UserId: req.user.id, JobId: job.id },
  });

  if (applicationExists) {
    return res.status(409).json({
      status: "fail",
      message: "You have already applied for this job",
    });
  }

  const jobQuestions = await Question.findAll({
    where: { JobId: job.id },
  });

  if (
    jobQuestions.length !== (req.body.answers?.length || 0) ||
    !jobQuestions.every((question) =>
      req.body.answers.some((answer) => +answer.QuestionId === question.id)
    )
  ) {
    return res.status(400).json({
      status: "fail",
      message: "You must answer all the questions",
    });
  }

  const application = await Application.create({
    UserId: req.user.id,
    JobId: job.id,
  });

  await Promise.all(
    req.body.answers.map((answer) => application.createAnswer(answer))
  );

  res.status(201).json({
    status: "success",
    data: {
      application,
    },
  });
});

exports.getJobApplications = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.jobId, {
    include: [
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

  if (job.CompanyId !== req.company.id) {
    return res.status(401).json({
      status: "fail",
      message: "You are not authorized to view this job's applications",
    });
  }

  let filter = { JobId: job.id };
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.stage) {
    filter.stage = req.query.stage;
  }

  const applications = await Application.findAll({
    where: filter,
  });

  res.status(200).json({
    status: "success",
    data: {
      job,
      applications,
    },
  });
});

exports.getJobApplication = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.jobId, {
    include: [
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

  if (job.CompanyId !== req.company.id) {
    return res.status(401).json({
      status: "fail",
      message: "You are not authorized to view this job's applications",
    });
  }

  const application = await Application.findByPk(req.params.id, {
    include: [
      {
        model: Answer,
      },
    ],
  });

  if (!application) {
    return res.status(404).json({
      status: "fail",
      message: "No application found with that ID",
    });
  }

  const user = await User.findByPk(application.UserId, {
    attributes: ["id", "firstName", "lastName"],
  });

  res.status(200).json({
    status: "success",
    data: {
      job,
      application,
      user,
    },
  });
});

exports.updateApplicationStatus = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.jobId);

  if (!job) {
    return res.status(404).json({
      status: "fail",
      message: "No job found with that ID",
    });
  }

  if (job.CompanyId !== req.company.id) {
    return res.status(401).json({
      status: "fail",
      message: "You are not authorized to view this job's applications",
    });
  }

  const application = await Application.findByPk(req.params.id);

  if (!application) {
    return res.status(404).json({
      status: "fail",
      message: "No application found with that ID",
    });
  }

  if (application.status === "Closed" || application.status === "Accepted") {
    return res.status(400).json({
      status: "fail",
      message: `You can't change the status of an application that is already ${application.status}`,
    });
  }

  await application.update({ status: req.body.status });

  res.status(200).json({
    status: "success",
    data: {
      application,
    },
  });
});

exports.changeApplicationStage = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.jobId);

  if (!job) {
    return res.status(404).json({
      status: "fail",
      message: "No job found with that ID",
    });
  }

  if (job.CompanyId !== req.company.id) {
    return res.status(401).json({
      status: "fail",
      message: "You are not authorized to view this job's applications",
    });
  }

  const application = await Application.findByPk(req.params.id);

  if (!application) {
    return res.status(404).json({
      status: "fail",
      message: "No application found with that ID",
    });
  }

  await application.update({ stage: req.body.stage });

  res.status(200).json({
    status: "success",
    data: {
      application,
    },
  });
});

exports.saveJob = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { jobId } = req.body;

  const existingSavedJob = await SavedJob.findOne({
    where: { UserId: userId, JobId: jobId },
  });

  if (existingSavedJob) {
    return res.status(409).json({
      status: "fail",
      message: "Job already saved",
    });
  }

  const savedJob = await SavedJob.create({ UserId: userId, JobId: jobId });

  res.status(201).json({
    status: "success",
    data: {
      savedJob,
    },
  });
});

exports.getAllSavedJobs = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const userWithSavedJobs = await User.findByPk(userId, {
    include: [
      {
        model: Job,
        include: [
          { model: Company, attributes: ["name"] },
          {
            model: Category,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  if (!userWithSavedJobs) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  const jobs = userWithSavedJobs.Jobs;

  res.status(200).json({
    status: "success",
    results: jobs.length,
    data: { jobs },
  });
});

exports.deleteSavedJob = catchAsync(async (req, res, next) => {
  const { savedJobId } = req.params;
  const userId = req.user.id;

  const savedJob = await SavedJob.findOne({
    where: {
      id: savedJobId,
      UserId: userId,
    },
  });

  if (!savedJob) {
    return res.status(404).json({
      status: "fail",
      message: "No saved job found with that ID for the current user",
    });
  }

  await savedJob.destroy();

  res.status(200).json({
    status: "success",
    data: null,
  });
});
