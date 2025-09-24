const { PythonShell } = require("python-shell");

exports.predictCrop = async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    if ([N, P, K, temperature, humidity, ph, rainfall].some(v => v === undefined)) {
      return res.status(400).json({ message: "Please provide N, P, K, temperature, humidity, ph, and rainfall" });
    }

    // Send input as JSON to Python
    const inputData = JSON.stringify({ N, P, K, temperature, humidity, ph, rainfall });

    let options = {
      mode: "json",
      pythonPath: "python3", // or 'python' on Windows
      scriptPath: "./model",
    };

    let pyshell = new PythonShell("predict.py", options);

    let resultData;
    pyshell.send(inputData);

    pyshell.on("message", (message) => {
      resultData = message;
    });

    pyshell.end((err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ ...req.body, ...resultData });
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
