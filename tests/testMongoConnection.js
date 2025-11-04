// testMongoConnection.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

async function testConnection() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connection successful!");

    // Optional: test a simple operation
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("📂 Collections:", collections.map(c => c.name));

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔒 Disconnected from MongoDB.");
  }
}

testConnection();
