const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyController');
const  authenticateCompany = require('../utils/helperMiddlewares/authenticateCompany');

router.post('/profile'  , authenticateCompany ,  companyProfileController.updateCompanyProfile);

module.exports = router;
