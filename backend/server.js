import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import pharmacistRoutes from "./routes/pharmacistRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import healthTipRoutes from "./routes/healthTipRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Must be before routes

// Routes
app.use("/api", aiRoutes); // AI Chatbot route
app.use("/api/auth", authRoutes);
app.use("/api/pharmacists", pharmacistRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/healthTips", healthTipRoutes);

// Health check
app.get("/", (req, res) => res.send("API is running"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
