import express from "express";
import multer from "multer";
import {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";
import { protect, pharmacistOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Public routes
router.get("/", getMedicines);
router.get("/:id", getMedicineById);

// Pharmacist-only routes
router.post("/", upload.single("image"), createMedicine);
router.put("/:id", protect, pharmacistOnly, upload.single("image"), updateMedicine);
router.delete("/:id", protect, pharmacistOnly, deleteMedicine);

export default router;
