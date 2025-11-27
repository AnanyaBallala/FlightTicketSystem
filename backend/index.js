import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";

import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js"; // import booking route

dotenv.config();

const app = express(); // <-- app MUST be created before using it

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../"));

// Routes
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes); // register booking route

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("✅ Connected to MySQL Database");
});
