const { v4: uuidv4 } = require("uuid");
const Experience = require("../models/experienceModel");
const Education = require("../models/educationModel");
const Certification = require("../models/certificationModel");
const sharp = require("sharp");
const { uploadMixOfImages } = require("../utils/uploadImage");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.uploadUserProfileMedia = uploadMixOfImages([
  { name: "avatar", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
]);

exports.getUserProfile = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile({
    include: [
      {
        model: Experience,
      },
      {
        model: Education,
      },
      {
        model: Certification,
      },
    ],
  });
  const skills = await userProfile.getSkills();
  const skillsData = skills.map(skill => ({
    skillName: skill.name, 
    proficiency: skill.UserSkill.proficiency,
    yearsOfExperience: skill.UserSkill.yearsOfExperience
  }));

  const { firstName, lastName, email } = req.user; 

  res.status(200).json({
    status: "success",
    data: {
      userProfile, 
      userInfo: {
        firstName,
        lastName,
        email,
      },
      skillsData
    },
  });
});

exports.updateUserProfileMedia = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  if (!userProfile.avatar && !req.files.avatar) {
    return res.status(400).json({
      status: "fail",
      message: "Please upload an avatar",
    });
  }

  if (!userProfile.coverPhoto && !req.files.coverPhoto) {
    return res.status(400).json({
      status: "fail",
      message: "Please upload a cover photo",
    });
  }

  if (req.files.avatar) {
    const avatarFileName = `avatar-${uuidv4()}.png`;

    await sharp(req.files.avatar[0].buffer)
      .resize({
        width: 1333,
        height: 1333,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .toFormat("png")
      .png({ quality: 95 })
      .toFile(`uploads/users/${avatarFileName}`);

    userProfile.avatar = avatarFileName;
  }

  if (req.files.coverPhoto) {
    const coverPhotoFileName = `cover-${uuidv4()}.png`;

    await sharp(req.files.coverPhoto[0].buffer)
      .resize({
        width: 1920,
        height: 600,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .toFormat("png")
      .png({ quality: 95 })
      .toFile(`uploads/users/${coverPhotoFileName}`);

    userProfile.coverPhoto = coverPhotoFileName;
  }

  await userProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      userProfile,
    },
  });
});

exports.updateUserInfo = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();
  
  const expectedFields = [
    "birthDate",
    "phone",
    "gender",
    "nationality",
    "drivingLicense",
    "country",
    "city",
    "area",
    "about",
    "openToWork" 
  ];

  const requiredFields = [
    "birthDate",
    "phone",
    "nationality",
    "country",
    "city",
  ];

  for (const field of requiredFields) {
    if (!req.body[field] && !userProfile[field]) {
      return res.status(400).json({
        status: "fail",
        message: `Please provide ${field}`,
      });
    }
  }

  for (const field of expectedFields) {
    if (req.body[field] !== undefined) userProfile[field] = req.body[field];
  }

  await userProfile.save();

  if(req.body.firstName || req.body.lastName) {
    req.user.firstName = req.body.firstName ;  
    req.user.lastName = req.body.lastName ;  
    await req.user.save() ;
  }
const {firstName, lastName} = req.user ;

  res.status(200).json({
    status: "success",
    data: {
      userProfile,
      userInfo: {
        firstName,
        lastName
      },
    },
  });
});

exports.updateUserCareerInterests = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();


  const expectedFields = [
    "currentCareerLevel",
    "jobTypes",
    "jobTitles",
    "jobCategories",
  ];

  for (const field of expectedFields) {
    if (!req.body[field] && !userProfile[field]) {
      return res.status(400).json({
        status: "fail",
        message: `Please provide ${field}`,
      });
    }
  }

  for (const field of expectedFields) {
    if (req.body[field]) userProfile[field] = req.body[field];
  }

  await userProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      userProfile,
    },
  });
});

// Experience

exports.updateTotalExperience = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  if (!req.body.totalYearsOfExperience) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide total years of experience",
    });
  }

  userProfile.totalYearsOfExperience = req.body.totalYearsOfExperience;

  await userProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      userProfile,
    },
  });
});

exports.addExperience = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  await userProfile.createExperience(req.body);

  const experiences = await userProfile.getExperiences();

  res.status(201).json({
    status: "success",
    data: {
      userProfile,
      experiences,
    },
  });
});

exports.updateExperience = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  const experiences = await userProfile.getExperiences({
    where: { id: req.params.id },
  });

  if (experiences.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Experience not found",
    });
  }

  await experiences[0].update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      experience: experiences[0],
    },
  });
});

exports.deleteExperience = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  const experiences = await userProfile.getExperiences({
    where: { id: req.params.id },
  });

  if (experiences.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Experience not found",
    });
  }

  await experiences[0].destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Education

exports.updateEducationLevel = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  if (!req.body.educationLevel) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide education level",
    });
  }

  userProfile.educationLevel = req.body.educationLevel;

  await userProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      userProfile,
    },
  });
});

exports.addEducation = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  await userProfile.createEducation(req.body);

  const educations = await userProfile.getEducation();

  res.status(201).json({
    status: "success",
    data: {
      userProfile,
      educations,
    },
  });
});

exports.updateEducation = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  const educations = await userProfile.getEducation({
    where: { id: req.params.id },
  });

  if (educations.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Education not found",
    });
  }

  await educations[0].update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      education: educations[0],
    },
  });
});

exports.deleteEducation = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  const educations = await userProfile.getEducation({
    where: { id: req.params.id },
  });

  if (educations.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Education not found",
    });
  }

  await educations[0].destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Certification

exports.addCertification = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  await userProfile.createCertification(req.body);

  const certifications = await userProfile.getCertifications();

  res.status(201).json({
    status: "success",
    data: {
      userProfile,
      certifications,
    },
  });
});

exports.updateCertification = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  const certifications = await userProfile.getCertifications({
    where: { id: req.params.id },
  });

  if (certifications.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Certification not found",
    });
  }

  await certifications[0].update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      certification: certifications[0],
    },
  });
});

exports.deleteCertification = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  const certifications = await userProfile.getCertifications({
    where: { id: req.params.id },
  });

  if (certifications.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Certification not found",
    });
  }

  await certifications[0].destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Language

exports.addLanguage = catchAsync(async (req, res) => {
  if (!req.body.language || !req.body.proficiency) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide language and proficiency",
    });
  }

  const userProfile = await req.user.getUserProfile();

  const languages = userProfile.languages || [];

  userProfile.languages = [
    ...languages,
    {
      id: uuidv4(),
      language: req.body.language,
      proficiency: req.body.proficiency,
    },
  ];

  await userProfile.save();

  res.status(201).json({
    status: "success",
    data: {
      userProfile,
    },
  });
});

exports.updateLanguage = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  const languages = userProfile.languages || [];

  userProfile.languages = languages.map((language) => {
    if (language.id === req.params.id) {
      return {
        id: language.id,
        language: req.body.language || language.language,
        proficiency: req.body.proficiency || language.proficiency,
      };
    }
    return language;
  });

  await userProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      userProfile,
    },
  });
});

exports.deleteLanguage = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  const languages = userProfile.languages || [];

  userProfile.languages = languages.filter(
    (language) => language.id !== req.params.id
  );

  await userProfile.save();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Online Presence

exports.updateOnlinePresence = catchAsync(async (req, res) => {
  const userProfile = await req.user.getUserProfile();

  for (const field in req.body) {
    if (req.body[field]) userProfile[field] = req.body[field];
  }

  await userProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      userProfile,
    },
  });
});

// change password Of user
exports.changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({ status: "success", userData: user });
});

exports.deleteUserAccount = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new Error("User not found");
  }
  const deleted = await req.user.destroy();
  if (deleted) {
    return res
      .status(401)
      .json({ status: "success", message: "User account deactivated" });
  }
});
