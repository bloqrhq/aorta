import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//mongoDB url
const URL = process.env.MONGO_URI;

//Connection function
const connectDB = async () => {
  try {
    await mongoose.connect(URL, {});
    console.log("MongoDB Connected Successfully......");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
