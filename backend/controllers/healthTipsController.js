import HealthTips from "../models/healthTipsModel.js";
import mongoose from "mongoose";
import cloudinary from "../utils/cloudinary.js"; 
import fs from "fs";

// Create a health tip
export const createHealthTip = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields!! (Backend error)",
      });
    }

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "healthTips",
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const newHealthTip = new HealthTips({
      title,
      category,
      description,
      image: imageUrl,
      imagePublicId,
    });

    await newHealthTip.save();
    res.status(201).json({ success: true, data: newHealthTip });
  } catch (error) {
    console.error("Error in Create Health Tip:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all health tips
export const getAllHealthTips = async (req, res) => {
  try {
    const healthTips = await HealthTips.find({});
    res.status(200).json({ success: true, data: healthTips });
  } catch (error) {
    console.error("Error fetching Health Tips:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get single health tip
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

// Update a health tip
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

    let imageUrl = existingHealthTip.image;
    let imagePublicId = existingHealthTip.imagePublicId;

    if (req.file) {
      // Delete old image from Cloudinary
      if (existingHealthTip.imagePublicId) {
        await cloudinary.uploader.destroy(existingHealthTip.imagePublicId);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'healthTips',
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;

      // Delete the temporary file
      fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
      });
    }

    const updatedHealthTip = await HealthTips.findByIdAndUpdate(
      id,
      { title, category, description, image: imageUrl, imagePublicId },
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
    const healthTip = await HealthTips.findById(id);

    if (!healthTip) {
      return res.status(404).json({ success: false, message: 'Health Tip not found' });
    }

    // Delete image from Cloudinary
    if (healthTip.imagePublicId) {
      await cloudinary.uploader.destroy(healthTip.imagePublicId);
    }

    // Delete record from DB
    await HealthTips.findByIdAndDelete(id);

    if (req.file) {

      // Delete the temporary file
      fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
      });
      
    }

    res.status(200).json({ success: true, message: 'Health Tip deleted successfully' });
  } catch (error) {
    console.error('Error deleting health tip:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
