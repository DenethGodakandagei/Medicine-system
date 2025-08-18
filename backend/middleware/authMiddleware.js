import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET); // ✅ match generator
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (error) {
    console.error("JWT verify failed:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};



export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  next();
};

export const pharmacistOnly = (req, res, next) => {
  if (req.user && req.user.role === "pharmacist") {
    next();
  } else {
    return res.status(403).json({ message: "Only pharmacists can perform this action" });
  }
};