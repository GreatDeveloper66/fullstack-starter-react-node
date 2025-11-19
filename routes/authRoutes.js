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
  sendVerificationCode,
  googleOAuth,
  facebookOAuth,
  linkedinOAuth,
  twitterOAuth,
  gitHubOAuth,
  oauthCallback
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword)
router.post("/send-code", sendVerificationCode);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.get("/profile", protect, getUserProfile);
router.patch("/profile", protect, updateUserProfile);
//("/profile", protect, updateUserProfile);
router.post("/logout", protect, logoutUser);
router.get("oauth/google", googleAuthRedirect);
router.get("oauth/google/callback", googleAuthCallback);

// router.get("/oauth/facebook", facebookOAuth);
// router.get("/oauth/linkedin", linkedinOAuth);
// router.get("/oauth/twitter", twitterOAuth);
// router.get("/oauth/github", gitHubOAuth);
// router.get("/oauth/callback", oauthCallback);

// router.get("oauth/google", googleAuthRedirect);
// router.get("/google/callback", googleAuthCallback);



export default router;
