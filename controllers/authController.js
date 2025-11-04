// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  // For JWT, logout is handled on the client side by deleting the token.
  res.json({ message: "Logout successful" });
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

export const updateUserProfile = async (req, res) => {  
  try {
    const { firstName, lastName, phone } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    // Generate reset token (in a real app, send this via email)
    const resetToken = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Here you would send the resetToken via email to the user
    res.json({ message: "Password reset token generated", resetToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }   
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isVerified = true;
    await user.save();
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });
    // Generate verification token (in a real app, send this via email)
    const verifyToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Here you would send the verifyToken via email to the user
    res.json({ message: "Verification email resent", verifyToken });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const googleOAuth = (req, res) => {
  // Placeholder for Google OAuth logic
  res.json({ message: "Google OAuth not implemented" });
};

export const facebookOAuth = (req, res) => {
  // Placeholder for Facebook OAuth logic
  res.json({ message: "Facebook OAuth not implemented" });
};

export const oauthCallback = (req, res) => {
  // Placeholder for OAuth callback logic
  res.json({ message: "OAuth callback not implemented" });
};  

export const gitHubOAuth = (req, res) => {
  // Placeholder for GitHub OAuth logic
  res.json({ message: "GitHub OAuth not implemented" });
};

export const twitterOAuth = (req, res) => {
  // Placeholder for Twitter OAuth logic
  res.json({ message: "Twitter OAuth not implemented" });
};  

export const linkedinOAuth = (req, res) => {
  // Placeholder for LinkedIn OAuth logic
  res.json({ message: "LinkedIn OAuth not implemented" });
};
