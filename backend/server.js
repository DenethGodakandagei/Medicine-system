import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import pharmacistRoutes from "./routes/pharmacistRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import healthTipRoutes from "./routes/healthTipRoutes.js";
import requestMedicineRoutes from "./routes/requestMedicineRoutes.js";

dotenv.config();

// Connect to MongoDB

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pharmacists", pharmacistRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/healthTips", healthTipRoutes);
app.use("/api/request", requestMedicineRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
