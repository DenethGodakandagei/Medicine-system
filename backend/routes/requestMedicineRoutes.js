import express from "express";
import {
  createRequest,
  getUserRequests,
  getPharmacistRequests,
  updateRequest,
  deleteRequest,
} from "../controllers/requestMedicineController.js";
import { protect, pharmacistOnly } from "../middleware/authMiddleware.js";

const requestMedicineRoutes = express.Router();

requestMedicineRoutes.post("/", protect, createRequest); // Create request
requestMedicineRoutes.get("/user", protect, getUserRequests); // Get requests by user
requestMedicineRoutes.get(
  "/pharmacist",
  protect,
  pharmacistOnly,
  getPharmacistRequests
); // Get requests by pharmacist
requestMedicineRoutes.put("/:requestId", protect, updateRequest); // Update request (status/quantity/etc.)
requestMedicineRoutes.delete("/:requestId", protect, deleteRequest); // Delete request

export default requestMedicineRoutes;
