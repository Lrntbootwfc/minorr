const Product = require('../models/Product');
const { randomForestPredict, gradientBoostingPredict, rlOptimize } = require('../ml_models');

class PricingService {
  constructor() {
    this.priceUpdateQueue = [];
    this.isProcessingQueue = false;
  }

  async calculateOptimalPrice(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    // Get baseline prediction from Random Forest
    const rfPrice = await randomForestPredict(product);
    
    // Refine with Gradient Boosting
    const gbmPrice = await gradientBoostingPredict(product, rfPrice);
    
    // Final optimization with Reinforcement Learning
    const optimalPrice = await rlOptimize(product, gbmPrice);
    
    // Update product
    product.priceHistory.push({
      price: optimalPrice,
      reason: 'auto_adjustment'
    });
    product.currentPrice = optimalPrice;
    await product.save();
    
    return optimalPrice;
  }

  async batchUpdatePrices() {
    try {
      const products = await Product.find();
      const results = await Promise.allSettled(
        products.map(product => this.calculateOptimalPrice(product._id))
      );
      
      return {
        success: true,
        updated: results.filter(r => r.status === 'fulfilled').length,
        failed: results.filter(r => r.status === 'rejected').length
      };
    } catch (error) {
      console.error('Batch update error:', error);
      throw error;
    }
  }

  async queuePriceUpdate(productId) {
    this.priceUpdateQueue.push(productId);
    if (!this.isProcessingQueue) {
      this.processQueue();
    }
  }

  async processQueue() {
    this.isProcessingQueue = true;
    while (this.priceUpdateQueue.length > 0) {
      const productId = this.priceUpdateQueue.shift();
      try {
        await this.calculateOptimalPrice(productId);
      } catch (error) {
        console.error(`Error processing product ${productId}:`, error);
      }
    }
    this.isProcessingQueue = false;
  }
}

module.exports = new PricingService();