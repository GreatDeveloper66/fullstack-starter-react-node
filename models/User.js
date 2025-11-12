// models/User.js
import mongoose from "mongoose";

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


export const sendVerificationCode = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone)
      return res.status(400).json({ message: "Email or phone required" });

    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // 🔢 Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationCode = code;
    user.codeExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    await user.save();

    // 📩 Send code via your preferred service
    // await sendSMS(phone, `Your login code is ${code}`);
    // or await sendEmail(email, `Your login code is ${code}`);

    res.json({ message: "Verification code sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default mongoose.model("User", userSchema);

