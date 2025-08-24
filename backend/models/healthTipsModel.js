import mongoose from "mongoose";

const healthTipsSchema = new mongoose.Schema({
    title: {type:String, required: true},
    category: {type : String, required: true},
    description: {type: String, required: true},
    image: { type: String },          // Cloudinary URL
    imagePublicId: { type: String },  // Needed for deleting/updating

},
    {timestamps: true},
);

export default mongoose.model("HealthTip", healthTipsSchema);