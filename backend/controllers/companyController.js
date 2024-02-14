const { v4: uuidv4 } = require("uuid");
const Company = require("../models/companyModel");
const CompanyProfile = require("../models/companyProfileModel");
const sharp = require("sharp");
const { uploadMixOfImages } = require("../utils/uploadImage");
const catchAsync = require("../utils/catchAsync");

exports.uploadCompanyMedia = uploadMixOfImages([
  { name: "logo", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
]);

exports.getCompanyProfile = catchAsync(async (req, res) => {
  const companyProfile = await req.company.getCompanyProfile({
    include: {
      model: Company,
      attributes: ["id", "name", "email", "phone", "industry"],
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      companyProfile,
    },
  });
});

exports.updateCompanyMedia = catchAsync(async (req, res) => {
  const companyProfile = await req.company.getCompanyProfile();

  if (!companyProfile.logo && !req.files.logo) {
    return res.status(400).json({
      status: "fail",
      message: "Please upload a logo",
    });
  }

  if (!companyProfile.coverPhoto && !req.files.coverPhoto) {
    return res.status(400).json({
      status: "fail",
      message: "Please upload a cover photo",
    });
  }

  if (req.files.logo) {
    const logoFileName = `logo-${uuidv4()}.png`;

    await sharp(req.files.logo[0].buffer)
      .resize({
        width: 1333,
        height: 1333,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .toFormat("png")
      .png({ quality: 95 })
      .toFile(`uploads/companies/${logoFileName}`);

    companyProfile.logo = logoFileName;
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
      .toFile(`uploads/companies/${coverPhotoFileName}`);

    companyProfile.coverPhoto = coverPhotoFileName;
  }

  await companyProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      companyProfile,
    },
  });
});

exports.updateCompanyInfo = catchAsync(async (req, res) => {
  const companyProfile = await req.company.getCompanyProfile();

  const expectedFields = [
    "country",
    "city",
    "size",
    "foundedYear",
    "description",
    "location",
  ];

  for (const field of expectedFields) {
    if (req.body[field]) companyProfile[field] = req.body[field];
  }

  await companyProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      companyProfile,
    },
  });
});

exports.updateOnlinePresence = catchAsync(async (req, res) => {
  const companyProfile = await req.company.getCompanyProfile();

  const expectedFields = [
    "website",
    "linkedin",
    "facebook",
    "twitter",
    "instagram",
    "youtube",
    "blog",
    "behance",
    "vimeo",
  ];

  for (const field of expectedFields) {
    if (req.body[field]) companyProfile[field] = req.body[field];
  }

  await companyProfile.save();

  res.status(200).json({
    status: "success",
    data: {
      companyProfile,
    },
  });
});
