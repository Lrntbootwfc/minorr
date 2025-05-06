const { GradientBoostingRegressor } = require('ml-gradient-boosting');
const Product = require('../../models/Product');
const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.join(__dirname, 'model.json');

let gbmModel = null;

async function loadModel() {
  if (gbmModel) return gbmModel;
  
  try {
    const modelStr = fs.readFileSync(MODEL_PATH, 'utf8');
    const modelJson = JSON.parse(modelStr);
    gbmModel = GradientBoostingRegressor.load(modelJson);
    return gbmModel;
  } catch (error) {
    console.error('Error loading GBM model:', error);
    throw error;
  }
}

async function predict(product, basePrice) {
  try {
    const model = await loadModel();
    
    // Get average competitor price
    const avgCompetitorPrice = product.competitorPrices.length > 0 ?
      product.competitorPrices.reduce((sum, cp) => sum + cp.price, 0) / product.competitorPrices.length :
      basePrice;
    
    // Prepare features
    const month = new Date().getMonth();
    const features = [
      product.demandFactor,
      product.elasticity,
      month,
      avgCompetitorPrice / basePrice // Normalized competitor price
    ];
    
    // Make prediction
    const prediction = model.predict([features]);
    return prediction[0] * basePrice; // Return absolute price
  } catch (error) {
    console.error('GBM prediction error:', error);
    throw error;
  }
}

module.exports = predict;