const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { Op } = require("sequelize");
const Company = require("../models/companyModel");
const CompanyProfile = require("../models/companyProfileModel");
const Category = require("../models/categoryModel");
const factory = require("./handlerFactory");
const { uploadMixOfImages } = require("../utils/uploadImage");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

exports.uploadCompanyMedia = uploadMixOfImages([
  { name: "logo", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
]);

exports.getAllCompanies = catchAsync(async (req, res, next) => {
  const countries = req.query?.countries
    ? req.query.countries.split(",")
    : null;
  const cities = req.query?.cities ? req.query.cities.split(",") : null;
  const specializations = req.query?.spec ? req.query.spec.split(",") : null;

  const whereClause = {
    [Op.and]: [
      { country: { [Op.not]: null } },
      { city: { [Op.not]: null } },
      { description: { [Op.not]: null } },
    ],
  };

  if (countries) {
    whereClause[Op.and].push({ country: { [Op.in]: countries } });
  }

  if (cities) {
    whereClause[Op.and].push({ city: { [Op.in]: cities } });
  }

  const allCompaniesInclude = {
    model: CompanyProfile,
    attributes: [
      "id",
      "logo",
      "coverPhoto",
      "description",
      "country",
      "city",
      "size",
    ],
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
        through: { attributes: [] },
        as: "specializations",
        ...(specializations && {
          where: { name: { [Op.in]: specializations } },
        }),
      },
    ],
    where: whereClause,
  };

  factory.getAll(
    Company,
    allCompaniesInclude,
    "id,name,email,phone,IndustryId"
  )(req, res, next);
});

const companyProfileInclude = {
  include: [
    {
      model: Company,
      attributes: ["id", "name", "email", "phone", "industryId"],
    },
    {
      model: Category,
      attributes: ["id", "name"],
      through: { attributes: [] },
      as: "specializations",
    },
  ],
};

exports.getCompanyProfile = catchAsync(async (req, res) => {
  companyProfileInclude.include[0].attributes.push(
    "jobPostsUsed",
    "unlocksUsed",
    "invitationsUsed"
  );

  const companyProfile = await req.company.getCompanyProfile(
    companyProfileInclude
  );

  res.status(200).json({
    status: "success",
    data: {
      companyProfile,
    },
  });
});

exports.getCompanyProfileById = catchAsync(async (req, res) => {
  const company = await Company.findByPk(req.params.id);

  if (!company) {
    return next(new ApiError("Company not found", 404));
  }

  const companyProfile = await company.getCompanyProfile(companyProfileInclude);

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
    return next(new ApiError("Please upload a logo", 400));
  }

  if (!companyProfile.coverPhoto && !req.files.coverPhoto) {
    return next(new ApiError("Please upload a cover photo", 400));
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

exports.updateSpecializations = catchAsync(async (req, res) => {
  const companyProfile = await req.company.getCompanyProfile();

  await companyProfile.setSpecializations(req.body.specializations);

  res.status(200).json({
    status: "success",
    data: {
      companyProfile,
    },
  });
});

// change password Of company
exports.changePassword = catchAsync(async (req, res) => {
  const company = req.company;
  company.password = req.body.newPassword;
  await company.save();
  res.status(200).json({ status: "success", companyData: company });
});

exports.deleteCompanyAccount = catchAsync(async (req, res) => {
  if (!req.company) {
    throw new Error("company not found");
  }
  const deleted = await req.company.destroy();
  if (deleted) {
    return res
      .status(401)
      .json({ status: "success", message: "company account deactivated" });
  }
});

exports.changeCompanyEmail = catchAsync(async (req, res) => {
  const { newEmail } = req.body;

  const company = req.company;

  if (!company) {
    return res
      .status(404)
      .send({ status: "failed", message: "Company not found" });
  }
  company.email = newEmail;
  await company.save();

  res.status(200).send({
    status: "success",
    message: "Email updated successfully",
    companyData: company,
  });
});
