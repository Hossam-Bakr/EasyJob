const Company = require('../models/companyModel');
const CompanyProfile = require('../models/companyProfileModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const sendEmail = require('../utils/sendEmail');
const createStyledEmailMessage = require('../utils/createStyledEmailMessage');
const { Op } = require('sequelize');

// Search for companies
exports.searchCompanies = catchAsync(async (req, res, next) => {
  const { query } = req.query;
  const companies = await Company.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
        { email: { [Op.like]: `%${query}%` } },
        { id: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      {
        model: CompanyProfile
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    results: companies.length,
    data: {
      companies,
    },
  });
});

// View company profile
exports.viewCompanyProfile = catchAsync(async (req, res, next) => {
  const company = await Company.findByPk(req.params.id, {
    include: [
      {
        model: CompanyProfile
      },
    ],
  });

  if (!company) {
    return next(new ApiError('No company found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      company,
    },
  });
});

// Send email to company
exports.sendEmailToCompany = catchAsync(async (req, res, next) => {
  const { subject, message } = req.body;
  const company = await Company.findByPk(req.params.id);

  if (!company) {
    return next(new ApiError('No company found with that ID', 404));
  }

  const emailMessage = createStyledEmailMessage(subject, message);
  await sendEmail(company.email, subject, emailMessage);

  res.status(200).json({
    status: 'success',
    message: 'Email sent successfully',
  });
});

// Activate a company account
exports.activateCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByPk(req.params.id);

  if (!company) {
    return next(new ApiError('No company found with that ID', 404));
  }

  company.active = true;
  await company.save();

  res.status(200).json({
    status: 'success',
    data: {
      company,
    },
  });
});

// Deactivate a company account
exports.deactivateCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByPk(req.params.id);

  if (!company) {
    return next(new ApiError('No company found with that ID', 404));
  }

  company.active = false;
  await company.save();

  res.status(200).json({
    status: 'success',
    data: {
      company,
    },
  });
});