import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Use the MongoDB URI from the .env file or fall back to the local database
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/pricepilot";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
};

export default connectDB;
