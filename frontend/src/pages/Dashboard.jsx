import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [products, setProducts] = useState([]); // Default as empty array
  const navigate = useNavigate();

  const handleMLDashboardClick = () => {
    navigate("/ml-dashboard");
  };

  // Simulate API response with mock data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Product 1",
        base_price: 500,
        competitor_price: 520,
        predicted_price: 510,
      },
      {
        id: 2,
        name: "Product 2",
        base_price: 1000,
        competitor_price: 980,
        predicted_price: 990,
      },
      {
        id: 3,
        name: "Product 3",
        base_price: 1500,
        competitor_price: 1600,
        predicted_price: 1550,
      },
    ];

    // Simulate setting products from API response
    setProducts(mockData);
  }, []);

  if (!Array.isArray(products) || products.length === 0) {
    return <div>Loading products...</div>;  // Loading message or a fallback UI
  }

  return (
    <div style={styles.container}>
      <style>
        {`
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            min-height: 100vh;
          }
          * {
            box-sizing: border-box;
          }
          .dashboard-heading {
            font-size: 1.8rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #00ADB5;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          }

          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(1300px, 1fr));
            gap: 20px;
            width: 100%;
          }

          .product-card {
            background: #1e1e2f;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #393e46;
            color: #eeeeee;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease-in-out;
            width: 100%;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            border-color: #00ADB5;
          }

          .product-name {
            font-weight: bold;
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: #00FFF5;
          }

          .product-detail {
            margin: 5px 0;
            font-size: 0.95rem;
            color: #cfd8dc;
          }
        `}
      </style>

      <h2 className="dashboard-heading">Dashboard</h2>
      
      <button onClick={handleMLDashboardClick}>
        Go to ML Dashboard
      </button>
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-detail">Base Price: ₹{product.base_price}</p>
            <p className="product-detail">Competitor Price: ₹{product.competitor_price}</p>
            <p className="product-detail">Predicted Price: ₹{product.predicted_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#121212",
    minHeight: "100vh",
    width: "100%",  // Full-width
    maxWidth: "100%",
    overflowX: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
};

export default Dashboard;

 
 
 
 
 
 
 
 
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//       <div className="grid grid-cols-3 gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white p-4 border border-gray-300">
//             <h3 className="font-bold">{product.name}</h3>
//             <p>Base Price: {product.base_price}</p>
//             <p>Competitor Price: {product.competitor_price}</p>
//             <p>Predicted Price: {product.predicted_price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
