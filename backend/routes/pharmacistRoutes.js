import express from "express";
import { getPharmacists } from "../controllers/pharmacistController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getPharmacists);

export default router;
