const Job = require("../models/jobModel");
const Company = require("../models/companyModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const JobCategory = require("../models/jobCategoryModel");
const Skill = require("../models/skillModel");
const RequiredSkill = require("../models/requiredSkillModel");
const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const Application = require("../models/applicationModel");
const SavedJob = require("../models/savedJobModel");
const factory = require("./handlerFactory");
const { uploadMixOfAudios } = require("../utils/uploadAudio");
const catchAsync = require("../utils/catchAsync");

const fieldsArr = new Array(11)
  .fill(0)
  .map((_, i) => ({ name: `voiceAnswer${i}`, maxCount: 1 }));

exports.uploadVoiceAnswers = uploadMixOfAudios(fieldsArr);

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

// Saved Jobs

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

exports.applyForJob = catchAsync(async (req, res) => {
  const job = await Job.findByPk(req.params.jobId);

  if (!job) {
    return res.status(404).json({
      status: "fail",
      message: "No job found with that ID",
    });
  }

  const application = await Application.create({
    UserId: req.user.id,
    JobId: job.id,
  });

  if (req.body.answers) {
    await Promise.all(
      req.body.answers.map((answer) => application.createAnswer(answer))
    );
  }

  if (req.body.voices && req.files) {
    await Promise.all(
      req.body.voices.map((voice) => {
        voice.voiceAnswer =
          req.files[`voiceAnswer${voice.voiceAnswer}`][0].buffer;
        application.createAnswer(voice);
      })
    );
  }

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

  const applications = await Application.findAll({
    where: { JobId: job.id },
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

  const user = await User.findByPk(application.UserId);

  res.status(200).json({
    status: "success",
    data: {
      job,
      application,
      user,
    },
  });
});
