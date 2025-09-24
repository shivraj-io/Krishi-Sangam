const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const yieldRoutes = require("./routes/yieldRoutes");


const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cropRoutes = require("./routes/cropRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/crop", cropRoutes);
app.use("/api/yield", yieldRoutes);



// Default route
app.get("/", (req, res) => {
  res.send("🚜 Krishi Sangam Backend Running...");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;
