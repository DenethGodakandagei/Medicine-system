import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    brand: { type: String, required: true, maxlength: 50 },
    description: { type: String, default: "", maxlength: 500 },
    category: {
      type: String,
      enum: [
        "Tablet",
        "Capsule",
        "Syrup",
        "Injection",
        "Other",
        "Antibiotics",
        "Painkillers",
        "Cholesterol",
        "Antihistamines",
        "Diabetes",
      ],
      default: "Other",
    },
    dosage: { type: String, default: "", maxlength: 50 },
    price: { type: Number, required: true, min: 0, max: 999999.99 },
    stock: { type: Number, default: 0, min: 0 },
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
