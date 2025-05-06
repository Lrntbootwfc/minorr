import { useState } from "react";
import axios from "axios";

function SetPricing() {
  const [basePrice, setBasePrice] = useState("");
  const [competitorPrice, setCompetitorPrice] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePricing = async () => {
    const response = await axios.post("/api/predict-price", {
      base_price: basePrice,
      competitor_price: competitorPrice,
    });
    setPredictedPrice(response.data.predicted_price);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Set Pricing</h2>
      <input
        type="number"
        placeholder="Base Price"
        value={basePrice}
        onChange={(e) => setBasePrice(e.target.value)}
        className="mb-4 p-2 border border-gray-300"
      />
      <input
        type="number"
        placeholder="Competitor Price"
        value={competitorPrice}
        onChange={(e) => setCompetitorPrice(e.target.value)}
        className="mb-4 p-2 border border-gray-300"
      />
      <button onClick={handlePricing} className="p-2 bg-blue-500 text-white">
        Predict Price
      </button>
      {predictedPrice && (
        <div className="mt-4">
          <h3>Predicted Price: {predictedPrice}</h3>
        </div>
      )}
    </div>
  );
}

export default SetPricing;
