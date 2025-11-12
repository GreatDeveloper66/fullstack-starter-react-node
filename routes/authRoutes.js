// routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
  googleOAuth,
  facebookOAuth,
  linkedinOAuth,
  twitterOAuth,
  gitHubOAuth,
  oauthCallback
} from "../controllers/authController.js";

const router = express.Router();

// Routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword)
router.post("/send-code", sendVerificationCode);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.get("/oauth/google", googleOAuth);
router.get("/oauth/facebook", facebookOAuth);
router.get("/oauth/linkedin", linkedinOAuth);
router.get("/oauth/twitter", twitterOAuth);
router.get("/oauth/github", gitHubOAuth);
router.get("/oauth/callback", oauthCallback);

export default router;
