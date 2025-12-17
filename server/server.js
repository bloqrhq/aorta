import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/connectDB.js";
import questionRoutes from "./src/routes/QuestionRoute.js";
import authRoutes from "./src/routes/AuthRoute.js";

// loading environment variables
dotenv.config();

// Validate required environment variables
const validateEnv = () => {
  const required = ["MONGO_URI", "JWT_SECRET", "FRONTEND_URL"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((key) => console.error(`   - ${key}`));
    console.error("\nPlease check your .env file.");
    process.exit(1);
  }
  console.log("✅ Environment variables loaded successfully");
};

validateEnv();

// port from env
const PORT = process.env.PORT || 5000;

const app = express();

// Explicit origin required for cookie based auth; '*' is blocked by browsers.

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use(express.json());

// Connect to MongoDB (must complete before server accepts requests)
await connectDB();

app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);

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

app.get("/health", (_, res) => {
  res.status(200);
  res.send({
    status: "ok",
    message: "Server is running...",
  });
});
// Export for vercel deployment
export default app;
