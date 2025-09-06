import requestMedicineModel from "../models/requestMedicineModel.js";
import Pharmacist from "../models/pharmacistModel.js";
import Medicine from "../models/MedicineModel.js";

// Create a new request
export const createRequest = async (req, res) => {
  console.log("create request endpoint hit");

  try {
    const { pharmacistId, medicineId, quantity } = req.body;

    const userId = req.user ? req.user._id : null;

    // console.log("Creating request for user:", userId);
    // console.log("Request details:", { pharmacistId, medicineId, quantity });

    const existPharmacy = await Pharmacist.findOne({ pharmacistId });
    const existMedicine = await Medicine.findOne({ medicineId });

    if (!pharmacistId || !medicineId || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new requestMedicineModel({
      userId,
      pharmacistId: existPharmacy ? existPharmacy._id : pharmacistId,
      medicineId: existMedicine ? existMedicine._id : medicineId,
      quantity,
    });

    await newRequest.save();
    res.status(201).json({
      message: "Medicine requested successfully",
      request: newRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating request", error: error.message });
  }
};

// Get all requests for logged-in user
export const getUserRequests = async (req, res) => {
  console.log("getUserRequests endpoint hit");
  try {
    const userId = req.user ? req.user._id : null;

    console.log("Fetching requests for user:", userId);

    const requests = await requestMedicineModel
      .find({ userId })
      .populate("medicineId")
      .populate({
        path: "pharmacistId",
        populate: { path: "user", select: "name email" },
      })
      .sort({ createdAt: -1 });

    console.log("Fetched requests:", requests);

    res.status(200).json({ data: requests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching requests", error: error.message });
  }
};

// Get requests for the logged-in pharmacist
export const getPharmacistRequests = async (req, res) => {
  console.log("getPharmacistRequests endpoint hit");

  try {
    const userId = req.user?._id;
    console.log("role:", req.user?.role);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: no user ID" });
    }

    // find pharmacist profile linked to this user
    const pharmacist = await Pharmacist.findOne({ user: userId });
    console.log("Found pharmacist profile:", pharmacist);

    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist profile not found" });
    }

    console.log("Fetching requests for pharmacistId:", pharmacist._id);

    // fetch only requests belonging to this pharmacist
    const requests = await requestMedicineModel
      .find({ pharmacistId: pharmacist._id })
      .populate("medicineId")
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 });

    console.log("Fetched requests:", requests.length);

    res.status(200).json({ data: requests });
  } catch (error) {
    console.error("Error fetching pharmacist requests:", error);
    res.status(500).json({
      message: "Error fetching pharmacist requests",
      error: error.message,
    });
  }
};

// Update request (PUT)
export const updateRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const updateData = req.body;

    const updated = await requestMedicineModel
      .findByIdAndUpdate(requestId, updateData, { new: true })
      .populate("medicineId")
      .populate("pharmacistId")
      .populate("userId");

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request updated", data: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating request", error: error.message });
  }
};

// Delete request
export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const deleted = await requestMedicineModel.findByIdAndDelete(requestId);

    if (!deleted) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting request", error: error.message });
  }
};
