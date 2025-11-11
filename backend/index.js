import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import dataRoutes from "./routes/data.js";
import authRoutes from "./routes/auth.js";
import incidentRoutes from "./routes/incidents.js";
import analyticsRoutes from "./routes/analytics.js"; // if you use it

dotenv.config();
export const app = express();

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/ingest", dataRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "build")));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ detail: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
