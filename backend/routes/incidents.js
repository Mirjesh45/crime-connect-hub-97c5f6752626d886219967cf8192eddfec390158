// routes/incidents.js
import express from "express";
import Incident from "../models/incident.js";

const router = express.Router();

// GET all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json({ items: incidents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch incidents" });
  }
});

// POST new incident
router.post("/", async (req, res) => {
  try {
    const { crimeType, status, location, date, confidential = false, password = "" } = req.body;
    if (!crimeType || !status || !location || !date) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const newIncident = new Incident({
      crimeType,
      status,
      location,
      date,
      confidential,
      password: confidential ? password : undefined,
    });

    await newIncident.save();
    res.status(201).json({ message: "Incident added", incident: newIncident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add incident" });
  }
});

export default router;
