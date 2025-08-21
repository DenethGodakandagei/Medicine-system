import express from "express";
import {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

// GET all medicines / Search / Filter / Sort
router.get("/", getMedicines);

// GET single medicine
router.get("/:id", getMedicineById);

// POST new medicine
router.post("/", createMedicine);

// PUT update medicine
router.put("/:id", updateMedicine);

// DELETE medicine
router.delete("/:id", deleteMedicine);

export default router;
