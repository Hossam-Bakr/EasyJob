const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const createContactUsMessage = require('../utils/createContactUsMessage');
const ContactMessage = require('../models/contactMessageModel');

router.post('/', catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return next(new ApiError('All fields are required', 400));
  }

  const emailMessage = createContactUsMessage(name, email, subject, message);

  await sendEmail(process.env.EMAIL_USER, `Contact Us Message from ${name}`, emailMessage);

  // Save the message to the database
  await ContactMessage.create({
    name,
    email,
    subject,
    message,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(200).json({ message: 'Message sent successfully' });
}));

module.exports = router;
