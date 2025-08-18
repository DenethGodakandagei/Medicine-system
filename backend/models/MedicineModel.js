import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Tablet", "Capsule", "Syrup", "Injection", "Other"],
      default: "Other",
    },
    dosage: { type: String, required: true }, 
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    prescriptionRequired: { type: Boolean, default: false },
    image: { type: String, default: "" },
    pharmacist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacist",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
