const { predict_price } = require('../ml/predict_dynamic_price');

exports.predictPrice = (req, res) => {
    const input_data = req.body.data;
    const predicted_price = predict_price(input_data);
    res.json({ predicted_price });
};
