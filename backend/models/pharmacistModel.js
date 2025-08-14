import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pharmacyName: { type: String, required: true },
  licenseNumber: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Pharmacist", pharmacistSchema);
