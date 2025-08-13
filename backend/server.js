import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});
