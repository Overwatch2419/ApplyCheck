const express = require('express');
const router = express.Router();
const { analyzeJobDescription } = require('../controllers/analysisController');

router.post('/analyze', analyzeJobDescription);

module.exports = router;
