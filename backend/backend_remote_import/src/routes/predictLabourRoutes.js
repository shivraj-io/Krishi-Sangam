const express = require('express');
const router = express.Router();
const {predictLabour} = require('../controllers/labourController');

// Route to handle labour yield prediction requests
router.post('/predict-labour', predictLabour);
module.exports = router;