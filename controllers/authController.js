// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { sendSMS } from "../utils/sendSMS.js";

dotenv.config();

//helper function to create JWT token
const createJwtToken = (userId, expireTime) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: expireTime,
  });
};

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

    //create a token and store it in a cookie or send it in response
    const token = createJwtToken(user._id, "1d");

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, phone, password, code } = req.body;
    //🧠 1️⃣ Identify user by email or phone
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🧠 2️⃣ If login via password
    // 🔐 Password login

    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
    }
    // 🧠 3️⃣ If login via verification code
    // 🔢 Code login
    else if (code) {
      if (
        !user.verificationCode ||
        user.verificationCode !== code ||
        user.codeExpiresAt < Date.now()
      ) {
        return res.status(400).json({ message: "Invalid or expired code" });
      }
      user.verificationCode = null;
      user.codeExpiresAt = null;
      await user.save();
    }
    // 🧠 4️⃣ If neither provided
    else {
      return res.status(400).json({ message: "Missing credentials" });
    }
    // 🧠 5️⃣ Create session or token (for example, JWT)
    const token = createJwtToken(user._id, "1d");

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Invalidate token or session here if using server-side sessions
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      return res
        .status(200)
        .json({ message: "Logout successful: Remove token from client side" });
    } else {
      return res.status(400).json({ message: "No token provided" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    res.json({ message: "Client-side logout completed" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
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
    await user.updateOne(user);
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
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
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
    const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Here you would send the verifyToken via email to the user
    res.json({ message: "Verification email resent", verifyToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendVerificationCode = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone)
      return res.status(400).json({ message: "Phone number is required" });

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationCode = code;
    user.codeExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    await user.save();

    // Send code via Twilio
    await sendSMS(
      phone,
      `Your login code is ${code}. It expires in 5 minutes.`
    );

    res.json({ message: "Verification code sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const googleAuthRedirect = (req, res) => {
  const redirectUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      prompt: "select_account"
    });

  res.redirect(redirectUrl);
};


export const googleAuthCallback = async (req, res) => {
  try {
    const { code } = req.query;

    // 1️⃣ Exchange code for token
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { id_token } = tokenRes.data;

    // 2️⃣ Decode the id_token (Google JWT)
    const ticket = JSON.parse(
      Buffer.from(id_token.split(".")[1], "base64").toString()
    );

    const { email, given_name, family_name, sub } = ticket;

    // 3️⃣ Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName: given_name,
        lastName: family_name,
        email,
        password: null,          // no password since OAuth
        googleId: sub,           // store their Google user ID
      });
    }

    // 4️⃣ Create your own JWT
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Redirect user back to frontend with token
    res.redirect(`http://localhost:3000/dashboard?token=${jwtToken}`);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Google authentication failed" });
  }
};

// export const googleOAuth = (req, res) => {
//   // Placeholder for Google OAuth logic
//   res.json({ message: "Google OAuth not implemented" });
// };

// export const facebookOAuth = (req, res) => {
//   // Placeholder for Facebook OAuth logic
//   res.json({ message: "Facebook OAuth not implemented" });
// };

// export const oauthCallback = (req, res) => {
//   // Placeholder for OAuth callback logic
//   res.json({ message: "OAuth callback not implemented" });
// };

// export const gitHubOAuth = (req, res) => {
//   // Placeholder for GitHub OAuth logic
//   res.json({ message: "GitHub OAuth not implemented" });
// };

// export const twitterOAuth = (req, res) => {
//   // Placeholder for Twitter OAuth logic
//   res.json({ message: "Twitter OAuth not implemented" });
// };

// export const linkedinOAuth = (req, res) => {
//   // Placeholder for LinkedIn OAuth logic
//   res.json({ message: "LinkedIn OAuth not implemented" });
// };
