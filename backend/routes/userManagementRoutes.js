const express = require('express');
const userManagementController = require('../controllers/userManagementController');
const router = express.Router();

router.post('/addUser', userManagementController.addUser);
router.delete('/deleteUser/:id', userManagementController.deleteUser);
router.patch('/deactivateUser/:id', userManagementController.deactivateUser);
router.patch('/activateUser/:id', userManagementController.activateUser);
router.patch('/changeEmail/:id', userManagementController.changeEmail);
router.post('/sendEmail/:id', userManagementController.sendEmailToUser);
router.get('/search', userManagementController.searchUsers);
router.get('/profile/:id', userManagementController.viewUserProfile);

module.exports = router;