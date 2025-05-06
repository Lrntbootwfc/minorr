const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_id: String,
  product_name: String,
  base_price: Number,
  demand_level: String,
  season: String,
  competitor_price: Number,
  final_price: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
