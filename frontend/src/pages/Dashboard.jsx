import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 border border-gray-300">
            <h3 className="font-bold">{product.name}</h3>
            <p>Base Price: {product.base_price}</p>
            <p>Competitor Price: {product.competitor_price}</p>
            <p>Predicted Price: {product.predicted_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
