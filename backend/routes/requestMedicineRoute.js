import express from "express";
import {
  createRequest,
  getUserRequests,
  getPharmacistRequests,
  updateRequest,
  deleteRequest,
} from "../controllers/requestMedicineController.js";
import { protect, pharmacistOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRequest); // Create request
router.get("/user", protect, getUserRequests); // Get requests by user
router.get("/pharmacist", protect, pharmacistOnly, getPharmacistRequests); // Get requests by pharmacist
router.put("/:requestId", protect, updateRequest); // Update request (status/quantity/etc.)
router.delete("/:requestId", protect, deleteRequest); // Delete request

export default router;
