import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import rateLimitMiddleware from "./src/middlewares/rateLimiter.middleware.js";
import errorMiddleware from "./src/middlewares/rateLimiter.middleware.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Global Middlewares
app.use(
  cors({
    origin: "*", // or frontend URL
  }),
);

app.use(express.json());
app.use(rateLimitMiddleware);

// Routes
app.use("/", authRoutes);

// Global Error Middleware (last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
