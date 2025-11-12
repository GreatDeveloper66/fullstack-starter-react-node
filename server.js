import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Needed to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

app.use(cors());
// Middleware for JSON
app.use(express.json());

app.use("/api/auth/", authRoutes);

// // post to create a new user endpoint
// app.post("/api/auth/register", (req, res) => {
//   const { email, password, firstName, lastName,phoneNumber } = req.body;
//   // Here you would typically add code to save the user to your database
//   console.log("Registering user:", { email, password, firstName, lastName, phoneNumber });
//   res.status(201).json({ message: "User registered successfully" });
// });

// app.post("/api/auth/login", (req, res) => {
//   const { email, password } = req.body;
//   res.status(200).json({ message: "User logged in successfully" });
// });

// app.post("/api/auth/send-code", (req, res) => {
//   const { email, phone } = req.body;
//   console.log("Sending code to:", { email, phone });
//   res.status(200).json({ message: "Verification code sent" });
// });

// app.get("/api/auth/profile", (req, res) => {
//   // In a real application, you would fetch user profile from the database
//   res.status(200).json({
//     email: res.email || "Not logged in",
//     firstName: "John",
//     lastName: "Doe",
//     phoneNumber: "123-456-7890"
//   });
// })

// Example API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

// Serve static React files
app.use(express.static(path.join(__dirname, "frontend/build")));

// Catch-all route: send React index.html for any unknown route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
