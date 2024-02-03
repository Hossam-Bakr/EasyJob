const User = require("./userModel");
const Company = require("./companyModel");
const Skill = require("./skillModel");
const Job = require("./jobModel");
const Application = require("./applicationModel");
const NotificationPreference = require("./notificationPreferenceModel");
const PricingPlan = require("./pricingPlanModel");
const Interview = require("./interviewModel");
const UserProfile = require("./userProfileModel");
const CompanyProfile = require("./companyProfileModel");
const Category = require("./categoryModel");
const Question = require("./questionModel");
const Answer = require("./answerModel");
const JobCategory = require("./jobCategoryModel");
const UserSkill = require("./userSkillModel");
const RequiredSkill = require("./requiredSkillModel");
const SavedJob = require("./savedJobModel");

const cascadeOptions = { onDelete: "cascade", onUpdate: "cascade" };

const defineDBRelationships = () => {
  // 1:M

  Company.hasMany(Job, cascadeOptions);
  Job.belongsTo(Company);

  Job.hasMany(Application, cascadeOptions);
  Application.belongsTo(Job);

  User.hasMany(Application, cascadeOptions);
  Application.belongsTo(User);

  User.hasMany(NotificationPreference, cascadeOptions);
  NotificationPreference.belongsTo(User);

  User.hasMany(Interview, cascadeOptions);
  Interview.belongsTo(User);

  Company.hasMany(Interview, cascadeOptions);
  Interview.belongsTo(Company);

  Job.hasMany(Interview, cascadeOptions);
  Interview.belongsTo(Job);

  Job.hasMany(Question, cascadeOptions);
  Question.belongsTo(Job);

  Application.hasMany(Answer, cascadeOptions);
  Answer.belongsTo(Application);

  // M:N

  User.belongsToMany(Skill, { through: UserSkill });
  Skill.belongsToMany(User, { through: UserSkill });

  // User.belongsToMany(Job, { through: "UserJobs" });
  // Job.belongsToMany(User, { through: "UserJobs" });

  User.belongsToMany(Job, { through: SavedJob });
  Job.belongsToMany(User, { through: SavedJob });

  Job.belongsToMany(Skill, { through: RequiredSkill });
  Skill.belongsToMany(Job, { through: RequiredSkill });

  Job.belongsToMany(Category, { through: JobCategory });
  Category.belongsToMany(Job, { through: JobCategory });

  // 1:1

  PricingPlan.hasOne(Company);
  Company.belongsTo(PricingPlan);

  User.hasOne(UserProfile, cascadeOptions);
  UserProfile.belongsTo(User);

  Company.hasOne(CompanyProfile, cascadeOptions);
  CompanyProfile.belongsTo(Company);
};

module.exports = defineDBRelationships;
