const express = require('express');
const router = express.Router();
const specificTasksController = require('../controllers/specificTasksController'); 

router.get('/display-counts', specificTasksController.displayCounts);

module.exports = router;
