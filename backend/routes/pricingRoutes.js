const express = require("express");
const router = express.Router();
const { predictPrice } = require("../controllers/pricingController");

router.post("/predict-price", predictPrice);

module.exports = router;
