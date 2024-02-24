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
const Industry = require("./industryModel");
const Category = require("./categoryModel");
const Question = require("./questionModel");
const Answer = require("./answerModel");
const Certification = require("./certificationModel");
const Education = require("./educationModel");
const Experience = require("./experienceModel");
const JobCategory = require("./jobCategoryModel");
const CompanySpecialization = require("./companySpecializationModel");
const UserSkill = require("./userSkillModel");
const RequiredSkill = require("./requiredSkillModel");
const SavedJob = require("./savedJobModel");

const cascadeOptions = { onDelete: "cascade", onUpdate: "cascade" };

const defineDBRelationships = () => {
  // 1:M

  Company.hasMany(Job, cascadeOptions);
  Job.belongsTo(Company);

  // Job.hasMany(Application, cascadeOptions);
  // Application.belongsTo(Job);
  // User.hasMany(Application, cascadeOptions);
  // Application.belongsTo(User);

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

  Industry.hasMany(Category, cascadeOptions);
  Category.belongsTo(Industry);

  Industry.hasMany(Company, {
    foreignKey: { allowNull: false },
    ...cascadeOptions,
  });
  Company.belongsTo(Industry);

  UserProfile.hasMany(Certification, cascadeOptions);
  Certification.belongsTo(UserProfile);

  UserProfile.hasMany(Education, cascadeOptions);
  Education.belongsTo(UserProfile);

  UserProfile.hasMany(Experience, cascadeOptions);
  Experience.belongsTo(UserProfile);

  // M:N

  User.belongsToMany(Job, { through: Application });
  Job.belongsToMany(User, { through: Application });

  UserProfile.belongsToMany(Skill, { through: UserSkill });
  Skill.belongsToMany(UserProfile, { through: UserSkill });

  // User.belongsToMany(Job, { through: "UserJobs" });
  // Job.belongsToMany(User, { through: "UserJobs" });

  User.belongsToMany(Job, { through: SavedJob });
  Job.belongsToMany(User, { through: SavedJob });

  Job.belongsToMany(Skill, { through: RequiredSkill });
  Skill.belongsToMany(Job, { through: RequiredSkill });

  Job.belongsToMany(Category, { through: JobCategory });
  Category.belongsToMany(Job, { through: JobCategory });

  CompanyProfile.belongsToMany(Category, {
    through: CompanySpecialization,
    as: "specializations",
  });
  Category.belongsToMany(CompanyProfile, {
    through: CompanySpecialization,
    as: "specializations",
  });

  // 1:1

  PricingPlan.hasOne(Company);
  Company.belongsTo(PricingPlan);

  User.hasOne(UserProfile, cascadeOptions);
  UserProfile.belongsTo(User);

  Company.hasOne(CompanyProfile, cascadeOptions);
  CompanyProfile.belongsTo(Company);
};

module.exports = defineDBRelationships;
