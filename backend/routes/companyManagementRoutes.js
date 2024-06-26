const express = require('express');
const companyManagementController = require('../controllers/companyManagementController');
const router = express.Router();

router.get('/search', companyManagementController.searchCompanies);
router.get('/profile/:id', companyManagementController.viewCompanyProfile);
router.post('/sendEmail/:id', companyManagementController.sendEmailToCompany);
router.patch('/activate/:id', companyManagementController.activateCompany);
router.patch('/deactivate/:id', companyManagementController.deactivateCompany);

module.exports = router;
