import HealthTips from "../models/healthTipsModel.js";
import mongoose from "mongoose";
import cloudinary from '../utils/cloudinary.js'; 


//create a health tip
export const createHealthTip = async (req, res) => {

	try {
		const {
			title,
            category,
            description,

		} = req.body;

		if (!title || !category ||!description) {
			return res.status(400).json({ success: false, message: "Please provide all fields!! (Sent the error from Backend)" });
		}

		const newHealthTip = new HealthTips({
			title,
            category,
            description,
            image: req.file?.path || "",
		});

		await newHealthTip.save();
		res.status(201).json({ success: true, data: newHealthTip });
	} catch (error) {
		console.error("Error in Create Health Tip:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//get all health tips
export const getAllHealthTips = async (req, res) => {
	try {
		const healthTips = await HealthTips.find({});
		res.status(200).json({ success: true, data: healthTips });
	} catch (error) {
		console.error("Error fetching Health Tips:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//view single health tip
export const getSingleHealthTip = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid Health Tip ID' });
  }

  try {

    const healthTip = await HealthTips.findById(id);

    if (!healthTip) {
      return res.status(404).json({ success: false, message: 'Health Tip not found' });
    }

    res.status(200).json({ success: true, data: healthTip });
  } catch (error) {
    console.error('Error retrieving health tip:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//update a health tip
export const updateHealthTip = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid Health Tip ID' });
  }

  try {
    const { title, category, description } = req.body;

    const existingHealthTip = await HealthTips.findById(id);
    if (!existingHealthTip) {
      return res.status(404).json({ success: false, message: 'Health Tip not found' });
    }

    let image = existingHealthTip.image; 
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'healthTips',
      });
      image = result.secure_url;
    }

    // Update health tip
    const updatedHealthTip = await HealthTips.findByIdAndUpdate(
      id,
      { title, category, description, image },
      { new: true, runValidators: true } 
    );

    res.status(200).json({ success: true, data: updatedHealthTip });
  } catch (error) {
    console.error('Error updating health tip:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete a health tip
export const deleteHealthTip = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid Health Tip ID' });
  }

  try {
    const healthTip = await HealthTips.findByIdAndDelete(id);

    if (!healthTip) {
      return res.status(404).json({ success: false, message: 'Health Tip not found' });
    }

    res.status(200).json({ success: true, message: 'Health Tip deleted successfully' });
  } catch (error) {
    console.error('Error deleting health tip:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};