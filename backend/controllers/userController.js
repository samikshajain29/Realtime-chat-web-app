import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `current user error ${error}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    let { name } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let user = await User.findByIdAndUpdate(req.userId, {
      name,
      image,
    });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `profile error ${error}` });
  }
};
