const UserProfile = require("../models/userProfileModel");
const Skill = require("../models/skillModel");
const UserSkill = require("../models/userSkillModel");
const ApiError = require("../utils/ApiError");

exports.findUserProfile = async (userId) => {
  const userProfile = await UserProfile.findOne({
    where: { UserId: userId }, // Ensure correct column name 'UserId'
    include: [
      {
        model: Skill,
      },
    ],
  });
  if (!userProfile) {
    throw new ApiError("User profile not found", 404);
  }
  return userProfile;
};

exports.updateOrCreateSkill = async (skillId, newName) => {
  let skill;

  if (skillId) {
    // Update existing skill logic
    skill = await Skill.findByPk(skillId);
    if (!skill) {
      throw new ApiError("Skill not found", 404);
    }
    if (skill.name !== newName) {
      await skill.update({ name: newName });
    }
  } else {
    // Check if the skill already exists
    skill = await Skill.findOne({ where: { name: newName } });
    if (!skill) {
      // Create new skill logic
      skill = await Skill.create({ name: newName });
    }
  }
  return skill;
};

exports.updateUserSkillProficiency = async (
  userProfileId,
  skillId,
  newProficiency
) => {
  // Find or create the UserSkill association
  const [userSkill, created] = await UserSkill.findOrCreate({
    where: { UserProfileId: userProfileId, SkillId: skillId },
    defaults: { proficiency: newProficiency },
  });

  // Update the proficiency if the association already existed and the new proficiency is different
  if (!created && userSkill.proficiency !== newProficiency) {
    await userSkill.update({ proficiency: newProficiency });
  }

  return userSkill;
};
