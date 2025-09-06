import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import pharmacistRoutes from "./routes/pharmacistRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import healthTipRoutes from "./routes/healthTipRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pharmacists", pharmacistRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/healthTips", healthTipRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
