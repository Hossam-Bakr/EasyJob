const express = require('express');
const contactMessageController = require('../controllers/contactMessageController');
const router = express.Router();

router
  .route('/')
  .get(contactMessageController.getAllContactMessages);

router
  .route('/:id')
  .get(contactMessageController.getContactMessage)
  .delete(contactMessageController.deleteContactMessage);

module.exports = router;
