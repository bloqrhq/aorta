import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//mongoDB url
const URL = process.env.MONGO_URI || "mongodb://localhost:27017/aorta";

//Connection function
const connectDB = async () => {
  try {
    await mongoose.connect(URL, {});
    console.log("MongoDB Connected Successfully......");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
