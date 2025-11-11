import express from "express";
import CrimeRecord from "../models/CrimeRecord.js";

const router = express.Router();

router.get("/trends/:id", async (req, res) => {
  try {
    const trendId = req.params.id;
    let stats;

    if (trendId === "1") {
      stats = await CrimeRecord.aggregate([
        { $group: { _id: { $year: "$date" }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]);
    } else {
      stats = [];
    }

    res.json(
      stats.map((s) => ({
        year: s._id,
        count: s.count
      }))
    );
  } catch (error) {
    console.error("❌ Error in /analytics/trends/:id:", error); // 👈 log it
    res.status(500).json({ error: "Failed to fetch trends", details: error.message });
  }
});

export default router;
