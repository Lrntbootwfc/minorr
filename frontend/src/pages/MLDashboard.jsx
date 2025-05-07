import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MLDashboard = () => {
  const [products, setProducts] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent product data and predictions from your backend (Flask API)
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-predictions");
      const data = await response.json();
      setProducts(data.products);
      setPredictions(data.predictions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setLoading(false);
    }
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
      },
      {
        label: "Predicted Price",
        data: predictions,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          ML Pricing Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-blue-600">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 text-sm">Predictions</p>
            <p className="text-3xl font-bold text-green-500">{predictions.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 text-sm">Avg Predicted Price</p>
            <p className="text-3xl font-bold text-purple-600">
              ₹{(predictions.reduce((a, b) => a + b, 0) / predictions.length || 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Base vs Predicted Prices
          </h2>
          <div className="h-[400px]">
            {products.length > 0 && predictions.length > 0 ? (
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p className="text-center text-gray-400">No data to display chart.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLDashboard;
