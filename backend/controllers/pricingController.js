const { PythonShell } = require("python-shell");
const path = require("path");

const predictPrice = (req, res) => {
  const input = req.body;

  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: path.join(__dirname, "../ml"),
    args: [JSON.stringify(input)],
  };

  PythonShell.run("predict.py", options, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const price = parseFloat(result[0]);
    res.json({ predicted_price: price });
  });
};

module.exports = { predictPrice };
