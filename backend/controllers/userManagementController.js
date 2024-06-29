const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const sendEmail = require('../utils/sendEmail');
const createStyledEmailMessage = require('../utils/createStyledEmailMessage');
const { Op } = require('sequelize');

// Add a new user
exports.addUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const newUser = await User.create({ firstName, lastName, email, password, role });
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

// Delete a user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return next(new ApiError('No user found with that ID', 404));
  }
  await user.destroy();
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Deactivate a user account
exports.deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return next(new ApiError('No user found with that ID', 404));
  }
  user.active = false;
  await user.save();
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Activate a user account
exports.activateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return next(new ApiError('No user found with that ID', 404));
  }
  user.active = true;
  await user.save();
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Change user email
exports.changeEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return next(new ApiError('No user found with that ID', 404));
  }
  user.email = email;
  await user.save();
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Send email to user
exports.sendEmailToUser = catchAsync(async (req, res, next) => {
  const { subject, message } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return next(new ApiError('No user found with that ID', 404));
  }
  const emailMessage = createStyledEmailMessage(subject, message);
  await sendEmail(user.email, subject, emailMessage);
  res.status(200).json({
    status: 'success',
    message: 'Email sent successfully',
  });
});

// Search for users
exports.searchUsers = catchAsync(async (req, res, next) => {
  const { query } = req.query;
  const users = await User.findAll({
    where: {
      [Op.or]: [
        { firstName: { [Op.like]: `%${query}%` } },
        { lastName: { [Op.like]: `%${query}%` } },
        { email: { [Op.like]: `%${query}%` } },
      ],
    },
  });
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

// View user profile
exports.viewUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new ApiError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});