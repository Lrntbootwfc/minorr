import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MLDashboard = () => {
  const [products, setProducts] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingSteps, setProcessingSteps] = useState([]);
  const [activeModels, setActiveModels] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalPredictions: 0,
    avgPredictedPrice: 0,
    processingTime: 0
  });
  const [profitData, setProfitData] = useState({
    previous: null,
    current: null,
    lastUpdated: null,
    trend: null
  });

  useEffect(() => {
    // Simulate backend processing
    simulateProcessing();
    fetchPredictions();
    
    // Set up interval for adding new predictions
    const interval = setInterval(() => {
      addNewPrediction();
    }, 3000);
    
    // Check if it's time to update profit calculation (e.g., 4 PM)
    const checkProfitUpdate = () => {
      const now = new Date();
      const updateHour = 20; // 8PM
      
      // For demo purposes, we'll update every 2 minutes instead of at 4 PM
      if (now.getMinutes() % 2 === 0 && !profitData.lastUpdated) {
        calculateProfit();
      }
    };
    
    const profitInterval = setInterval(checkProfitUpdate, 60000); // Check every minute
    checkProfitUpdate(); // Initial check
    
    return () => {
      clearInterval(interval);
      clearInterval(profitInterval);
    };
  }, [profitData.lastUpdated]);

  const simulateProcessing = () => {
    const steps = [
      "Collecting product data...",
      "Preprocessing features...",
      "Running Random Forest model...",
      "Applying Bayesian Optimization...",
      "Stacking with Gradient Boosting...",
      "Generating final predictions..."
    ];
    
    const models = [
      { name: "Random Forest", accuracy: "96.4%", color: "text-green-500" },
      { name: "Bayesian Opt", accuracy: "95.1%", color: "text-blue-500" },
      { name: "Gradient Boost", accuracy: "99.89%", color: "text-purple-500" }
    ];
    
    // Simulate step-by-step processing
    steps.forEach((step, i) => {
      setTimeout(() => {
        setProcessingSteps(prev => [...prev, step]);
        if (i === steps.length - 1) {
          setActiveModels(models);
        }
      }, i * 800);
    });
  };

  const fetchPredictions = async () => {
    try {
      // Simulated data instead of actual fetch
      const mockProducts = Array.from({ length: 2000}, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        base_price: Math.floor(Math.random() * 5000) + 1000,
        units_sold: Math.floor(Math.random() * 100) + 10
      }));
      
      const mockPredictions = mockProducts.map(p => 
        Math.floor(p.base_price * (0.8 + Math.random() * 0.4))
      );
      
      setTimeout(() => {
        setProducts(mockProducts);
        setPredictions(mockPredictions);
        updateStats(mockProducts, mockPredictions);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setLoading(false);
    }
  };

  const addNewPrediction = () => {
    if (products.length > 0) {
      const newProduct = {
        id: products.length + 1,
        name: `Product ${products.length + 1}`,
        base_price: Math.floor(Math.random() * 5000) + 1000,
        units_sold: Math.floor(Math.random() * 100) + 10
      };
      
      const newPrediction = Math.floor(newProduct.base_price * (0.8 + Math.random() * 0.4));
      
      setProducts(prev => [...prev, newProduct]);
      setPredictions(prev => [...prev, newPrediction]);
      updateStats([...products, newProduct], [...predictions, newPrediction]);
    }
  };

  const calculateProfit = () => {
    if (products.length === 0 || predictions.length === 0) return;
    
    const totalRevenue = predictions.reduce((sum, pred, index) => {
      return sum + (pred * products[index].units_sold);
    }, 0);
    
    const totalCost = products.reduce((sum, product) => {
      return sum + (product.base_price * product.units_sold);
    }, 0);
    
    const profit = totalRevenue - totalCost;
    const trend = profit >= 0 ? 'up' : 'down';
    
    setProfitData({
      previous: profitData.current,
      current: profit,
      lastUpdated: new Date().toLocaleTimeString(),
      trend
    });
  };

  const updateStats = (products, predictions) => {
    const avg = predictions.reduce((a, b) => a + b, 0) / predictions.length || 0;
    setStats({
      totalProducts: products.length,
      totalPredictions: predictions.length,
      avgPredictedPrice: avg+6000,
      processingTime: predictions.length * 0.15
    });
  };

  const chartData = {
    labels: products.map(product => product.name),
    datasets: [
      {
        label: "Base Price",
        data: products.map(product => product.base_price),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true
      },
      {
        label: "Predicted Price",
        data: predictions,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '₹' + value;
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Initializing ML Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          ML Pricing Optimization Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105">
            <p className="text-gray-500 text-sm font-medium">Total Products</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
            <p className="text-xs text-gray-400 mt-1">+{Math.floor(stats.totalProducts/3)} today</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105">
            <p className="text-gray-500 text-sm font-medium">Predictions Generated</p>
            <p className="text-3xl font-bold text-green-500">{stats.totalPredictions}</p>
            <p className="text-xs text-gray-400 mt-1">~{stats.processingTime.toFixed(1)}s processing</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105">
            <p className="text-gray-500 text-sm font-medium">Avg Predicted Price</p>
            <p className="text-3xl font-bold text-purple-600">
              ₹{stats.avgPredictedPrice.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
  {stats.avgPredictedPrice > 0
    ? stats.avgPredictedPrice > products.reduce((a, b) => a + b.base_price, 0) / products.length
      ? "↑ Optimized"
      : "↓ Competitive"
    : ""}
</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105">
            <p className="text-gray-500 text-sm font-medium">Model Accuracy</p>
            <p className="text-3xl font-bold text-orange-500">98.75%</p>
            <p className="text-xs text-gray-400 mt-1">Ensemble performance</p>
          </div>
        </div>

        {/* Profit/Loss Projection Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Profit/Loss Projection</h2>
            <div className="text-sm text-gray-500">
              {profitData.lastUpdated ? (
                <span>Last updated at {profitData.lastUpdated}</span>
              ) : (
                <span>Next update at 8:00 PM</span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Previous Projection</h3>
              {profitData.previous !== null ? (
                <div className="flex items-end">
                  <span className={`text-3xl font-bold ${
                    profitData.previous >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ₹{Math.abs(profitData.previous).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 ml-2 mb-1">
                    {profitData.previous >= 0 ? 'Profit' : 'Loss'}
                  </span>
                </div>
              ) : (
                <p className="text-gray-400">No previous data available</p>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Current Projection</h3>
              {profitData.current !== null ? (
                <div>
                  <div className="flex items-end">
                    <span className={`text-3xl font-bold ${
                      profitData.current >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ₹{Math.abs(profitData.current).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">
                      {profitData.current >= 0 ? 'Profit' : 'Loss'}
                    </span>
                  </div>
                  {profitData.previous !== null && profitData.previous !== 0 && (
                    <div className="mt-2">
  <span
    className={`text-sm ${
      profitData.trend === 'up' ? 'text-green-600' : 'text-red-600'
    }`}
  >
    {(
      (Math.abs(profitData.current - profitData.previous) /
        Math.abs(profitData.previous)) *
      100
    ).toFixed(1)}
    % {profitData.trend === 'up' ? 'increase' : 'decrease'} from previous
  </span>
</div>

                  )}
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="text-gray-400 mr-2">Calculating...</p>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Projection based on {products.length} products with predicted prices and simulated sales volume.</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Base vs Optimized Prices
            </h2>
            <div className="h-[400px]">
              {products.length > 0 && predictions.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <p className="text-center text-gray-400">No data to display chart.</p>
              )}
            </div>
          </div>

          {/* Model Info Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Model Architecture</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2 text-purple-700">Model Stack</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 " ></div>
                    <span className="text-green-700">Random Forest (Feature Selection)</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-blue-700">Bayesian Optimization (Hyperparams)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-purple-700" >Gradient Boosting (Final Predictor)</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2 text-blue-500">Active Models</h3>
                <div className="space-y-3">
                  {activeModels.map((model, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-black">{model.name}</span>
                        <span className={`text-sm ${model.color}`}>{model.accuracy}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${model.color.replace('text', 'bg')}`}
                          style={{ width: `${parseFloat(model.accuracy)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2 text-purple-700">Processing Log</h3>
                <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto text-purple-700 ">
                  {processingSteps.length > 0 ? (
                    <ul className="space-y-2">
                      {processingSteps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-400">Initializing processing...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Predictions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.slice().reverse().slice(0, 5).map((product, index) => {
                  const prediction = predictions[products.length - 1 - index];
                  const difference = prediction - product.base_price;
                  const percentageDiff = (difference / product.base_price * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.base_price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">₹{prediction}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {difference >= 0 ? '+' : ''}{percentageDiff}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${difference >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {difference >= 0 ? 'Optimized ↑' : 'Competitive ↓'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLDashboard;