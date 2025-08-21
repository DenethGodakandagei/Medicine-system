import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Antibiotic", "Painkiller", "Vitamin", "Other"], // you can expand categories
    },
    image: {
      type: String, // URL to medicine image
      default: "https://via.placeholder.com/150",
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String, // city or area
      required: true,
    },
    distance: {
      type: Number, // distance in km (optional, useful for sorting)
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // reference to user who added
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
