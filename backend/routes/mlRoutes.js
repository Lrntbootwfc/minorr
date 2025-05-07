const express = require('express');
const router = express.Router();
const mlController = require('../controllers/mlController');

router.post('/predict-price', mlController.predictPrice);

module.exports = router;
