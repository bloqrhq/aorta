import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/connectDB.js";

// loading environment veriables
dotenv.config();

// port from env
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

//connect to mongoDB
connectDB();

// Base backend test
app.get("/", (_, res) => {
  res.send("API is running...");
});

// Only allow in delelopment mode
if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`
        Server is running... At
         http://localhost:${PORT}
        `);
  });
}

// Export for vercel deployment
export default app;
