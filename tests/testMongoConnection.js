// ...existing code...
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${userName}:${password}@cluster0.bd45ngl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = process.env.MONGO_URI;

async function testConnection() {
  if (!uri) {
    console.error("❌ MONGO_URI is not set. Add MONGO_URI to your .env (or env) with a value like:");
    console.error("   mongodb://user:pass@localhost:27017/mydb");
    console.error("   or mongodb+srv://user:pass@cluster0.example.mongodb.net/mydb?retryWrites=true&w=majority");
    process.exit(1);
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    console.warn("⚠️ MONGO_URI doesn't start with mongodb:// or mongodb+srv:// — double-check format:", uri);
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    console.log("URI:", uri);
    await mongoose.connect(uri, {
      // In Mongoose 6+, these options are default; harmless if present
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connection successful!");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("📂 Collections:", collections.map(c => c.name));

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState) {
      await mongoose.disconnect();
      console.log("🔒 Disconnected from MongoDB.");
    }
  }
}

testConnection();
// ...existing code...



// // testMongoConnection.js
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const uri = process.env.MONGO_URI;

// async function testConnection() {
//   try {
//     console.log("🔌 Connecting to MongoDB...");
//     console.log("URI:", uri);
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB connection successful!");

//     // Optional: test a simple operation
//     const db = mongoose.connection.db;
//     const collections = await db.listCollections().toArray();
//     console.log("📂 Collections:", collections.map(c => c.name));

//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err.message);
//   } finally {
//     await mongoose.disconnect();
//     console.log("🔒 Disconnected from MongoDB.");
//   }
// }

// testConnection();
