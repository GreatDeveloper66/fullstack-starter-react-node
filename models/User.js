// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: String,

    // 🧠 for verification / OTP login
    verificationCode: String,
    codeExpiresAt: Date,
  },
  { timestamps: true }
);

// Optional: automatically remove expired codes
userSchema.index({ codeExpiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("User", userSchema);

// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String },
//   },
//   { timestamps: true }
// );