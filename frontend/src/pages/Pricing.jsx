import { useState, useEffect, useContext } from 'react';
import { usePricing } from '../../context/PricingContext';
import PriceChart from '../../components/pricing/PriceChart';
import CompetitorAnalysis from '../../components/pricing/CompetitorAnalysis';
import OptimizationPanel from '../../components/pricing/OptimizationPanel';
import { getPriceHistory, runOptimization } from '../../services/pricingService';

const Pricing = () => {
  const { products } = usePricing();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      loadPriceHistory(selectedProduct);
    }
  }, [selectedProduct]);

  const loadPriceHistory = async (productId) => {
    try {
      const history = await getPriceHistory(productId);
      setPriceHistory(history);
    } catch (error) {
      console.error('Failed to load price history:', error);
    }
  };

  const handleOptimize = async () => {
    if (!selectedProduct) return;
    
    setIsOptimizing(true);
    try {
      const result = await runOptimization(selectedProduct);
      setOptimizationResult(result);
      loadPriceHistory(selectedProduct);
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pricing Optimization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product Selection */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="space-y-3">
            {products.map(product => (
              <div
                key={product._id}
                onClick={() => setSelectedProduct(product._id)}
                className={`p-3 border rounded cursor-pointer transition ${
                  selectedProduct === product._id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600">${product.currentPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {selectedProduct ? (
            <>
              {/* Price Chart */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {products.find(p => p._id === selectedProduct)?.name}
                  </h2>
                  <button
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {isOptimizing ? 'Optimizing...' : 'Optimize Price'}
                  </button>
                </div>
                <PriceChart data={priceHistory} />
              </div>
              
              {/* Optimization Results */}
              {optimizationResult && (
                <OptimizationPanel 
                  result={optimizationResult} 
                  product={products.find(p => p._id === selectedProduct)} 
                />
              )}
              
              {/* Competitor Analysis */}
              <CompetitorAnalysis productId={selectedProduct} />
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">Select a product to view pricing details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;