import Medicine from "../models/MedicineModel.js";
import Pharmacist from "../models/pharmacistModel.js";
import cloudinary from "../utils/cloudinary.js";


// Create new medicine
export const createMedicine = async (req, res) => {
  const {
    name,
    brand,
    dosage,
    price,
    stock,
    expiryDate,
    description,
    category,
    prescriptionRequired,
  } = req.body;

  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "medicines",
      });
      imageUrl = result.secure_url;
    }

    const medicine = await Medicine.create({
      name,
      brand,
      dosage,
      price,
      stock,
      expiryDate,
      description,
      category,
      prescriptionRequired,
      image: imageUrl,
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all medicines
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate(
      "pharmacist",
      "pharmacyName licenseNumber"
    );
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single medicine by ID
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate(
      "pharmacist",
      "pharmacyName licenseNumber"
    );
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update medicine
export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    const pharmacist = await Pharmacist.findOne({ user: req.user._id });
    if (
      !pharmacist ||
      medicine.pharmacist.toString() !== pharmacist._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to update this medicine" });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "medicines",
      });
      medicine.image = result.secure_url;
    }

    Object.assign(medicine, req.body);
    await medicine.save();

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete medicine
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    const pharmacist = await Pharmacist.findOne({ user: req.user._id });
    if (
      !pharmacist ||
      medicine.pharmacist.toString() !== pharmacist._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to delete this medicine" });
    }

    await medicine.deleteOne();
    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
