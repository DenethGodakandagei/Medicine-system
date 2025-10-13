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

    const requests = await requestMedicineModel
      .find({ userId })
      .populate("medicineId")
      .populate({
        path: "pharmacistId",
        populate: { path: "user", select: "name email" },
      })
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, message: "My requests fetched", data: requests });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching requests",
        error: error.message,
      });
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
    // console.log("Found pharmacist profile:", pharmacist);

    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist profile not found" });
    }

    // console.log("Fetching requests for pharmacistId:", pharmacist._id);

    // fetch only requests belonging to this pharmacist
    const requests = await requestMedicineModel
      .find({ pharmacistId: pharmacist._id })
      .populate("medicineId")
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 });

    // console.log("Fetched requests:", requests.length);

    res.status(200).json({ data: requests });
  } catch (error) {
    console.error("Error fetching pharmacist requests:", error);
    res.status(500).json({
      message: "Error fetching pharmacist requests",
      error: error.message,
    });
  }
};

// Update request - change the status of order (PUT)
export const updateRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const user = req.user; // assuming you attach logged-in user to req.user via middleware

    // Check if user is a pharmacist
    if (!user || user.role !== "pharmacist") {
      return res
        .status(403)
        .json({ message: "Only pharmacists can update requests" });
    }

    // Update status
    const updated = await requestMedicineModel
      .findByIdAndUpdate(
        requestId,
        { status }, // status must be wrapped in object
        { new: true }
      )
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

// for user requested cart
export const createRequests = async (req, res) => {
  console.log("createRequests cart endpoint hit");

  try {
    const { medicineIds } = req.body; // array of medicine IDs
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    if (!Array.isArray(medicineIds) || medicineIds.length === 0) {
      return res.status(400).json({ message: "No medicines provided" });
    }

    // ✅ Fetch all medicines at once
    const medicines = await Medicine.find({
      _id: { $in: medicineIds },
    }).populate("pharmacist", "_id");

    if (medicines.length === 0) {
      return res.status(404).json({ message: "No valid medicines found" });
    }

    // ✅ Create request documents
    const requestsToInsert = medicines.map((medicine) => ({
      userId,
      pharmacistId: medicine.pharmacist?._id || null, // pharmacist from DB
      medicineId: medicine._id,
      quantity: 1, // default quantity = 1 (or adjust as needed)
    }));

    // ✅ Bulk insert
    const createdRequests = await requestMedicineModel.insertMany(
      requestsToInsert
    );

    return res.status(201).json({
      message: "Medicine requests created successfully",
      data: createdRequests,
    });
  } catch (error) {
    console.error("Error creating medicine requests:", error);
    return res.status(500).json({
      message: "Error creating medicine requests",
      error: error.message,
    });
  }
};
