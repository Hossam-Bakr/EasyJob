const ContactMessage = require('../models/contactMessageModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

// Get all contact messages
exports.getAllContactMessages = catchAsync(async (req, res, next) => {
  const messages = await ContactMessage.findAll();
  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      messages,
    },
  });
});

// Get a single contact message
exports.getContactMessage = catchAsync(async (req, res, next) => {
  const message = await ContactMessage.findByPk(req.params.id);
  if (!message) {
    return next(new ApiError('No message found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      message,
    },
  });
});

// Delete a contact message
exports.deleteContactMessage = catchAsync(async (req, res, next) => {
  const message = await ContactMessage.findByPk(req.params.id);
  if (!message) {
    return next(new ApiError('No message found with that ID', 404));
  }
  await message.destroy();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
