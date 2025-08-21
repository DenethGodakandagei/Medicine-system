import Medicine from "../models/Medicine.js";

// @desc   Get all medicines (with search, filter, sort)
// @route  GET /api/medicines
export const getMedicines = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let query = {};

    // 🔍 Search by name or category
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    let medicines = Medicine.find(query);

    // 🔽 Sorting
    if (sort === "expiry") {
      medicines = medicines.sort({ expiryDate: 1 }); // soonest first
    } else if (sort === "name") {
      medicines = medicines.sort({ name: 1 }); // A-Z
    } else if (sort === "distance") {
      medicines = medicines.sort({ distance: 1 }); // nearest first
    }

    const results = await medicines;
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get a single medicine by ID
// @route  GET /api/medicines/:id
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Add a new medicine
// @route  POST /api/medicines
export const createMedicine = async (req, res) => {
  try {
    const { name, category, image, expiryDate, location, distance, quantity, createdBy } = req.body;

    const medicine = new Medicine({
      name,
      category,
      image,
      expiryDate,
      location,
      distance,
      quantity,
      createdBy,
    });

    const savedMedicine = await medicine.save();
    res.status(201).json(savedMedicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc   Update a medicine
// @route  PUT /api/medicines/:id
export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc   Delete a medicine
// @route  DELETE /api/medicines/:id
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json({ message: "Medicine deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
