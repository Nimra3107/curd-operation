import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://umairmailme:umair%40123@cluster0.vgygiyt.mongodb.net/";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  throw new Error("MONGODB_URI not found");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("🔌 Connecting to MongoDB...");

  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected!");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
