const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyController');
const  authenticateCompany = require('../utils/helperMiddlewares/authenticateCompany');
const { getCandidatesByCompanyCategories } = require('../controllers/candidateController');


router.post('/profile'  , authenticateCompany ,  companyProfileController.updateCompanyProfile);
router.get('/:companyId/candidates', getCandidatesByCompanyCategories);


module.exports = router;
