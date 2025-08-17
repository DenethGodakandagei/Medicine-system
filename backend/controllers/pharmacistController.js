import Pharmacist from "../models/pharmacistModel.js";

export const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find().populate("user", "firstName lastName email");
    res.json(pharmacists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
