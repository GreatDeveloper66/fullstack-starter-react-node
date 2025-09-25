import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Needed to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for JSON
app.use(express.json());

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
