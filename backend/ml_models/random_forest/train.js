const { RandomForestRegression } = require('ml-random-forest');
const Product = require('../../models/Product');
const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.join(__dirname, 'model.json');

async function trainModel() {
  try {
    // Fetch training data
    const products = await Product.find().select('priceHistory demandFactor elasticity');
    
    // Prepare training set
    const features = [];
    const labels = [];
    
    products.forEach(product => {
      product.priceHistory.forEach(entry => {
        const month = new Date(entry.date).getMonth();
        features.push([product.demandFactor, product.elasticity, month]);
        labels.push(entry.price);
      });
    });
    
    // Train model
    const options = {
      seed: 42,
      maxFeatures: 2,
      replacement: true,
      nEstimators: 100,
      useSampleBagging: true
    };
    
    const rf = new RandomForestRegression(options);
    rf.train(features, labels);
    
    // Save model
    const modelStr = JSON.stringify(rf.toJSON());
    fs.writeFileSync(MODEL_PATH, modelStr);
    
    console.log('Random Forest model trained and saved');
    return rf;
  } catch (error) {
    console.error('Error training Random Forest:', error);
    throw error;
  }
}

module.exports = trainModel;