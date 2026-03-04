import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { rateLimiter } from "./src/middlewares/rateLimiter.middleware.js";
dotenv.config();

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
