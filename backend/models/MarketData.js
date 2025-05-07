const mongoose = require('mongoose');

const marketDataSchema = new mongoose.Schema({
    product_id: String,
    competitor_price: Number,
    demand: Number,
    supply: Number,
    inventory: Number
});

module.exports = mongoose.model('MarketData', marketDataSchema);
