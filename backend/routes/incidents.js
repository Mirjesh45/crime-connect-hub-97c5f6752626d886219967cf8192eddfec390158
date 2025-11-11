import express from "express";
import Incident from "../models/Incident.js";

const router = express.Router();

/**
 * @route   GET /incidents
 * @desc    Get all incidents
 */
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ created_at: -1 });
    res.json({
      incidents: incidents.map((incident) => incident.toJSON()),
    });
  } catch (err) {
    console.error("Error fetching incidents:", err);
    res.status(500).json({ error: "Failed to fetch incidents" });
  }
});

/**
 * @route   GET /incidents/:id
 * @desc    Get single incident by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }

    res.json(incident.toJSON());
  } catch (err) {
    console.error("Error fetching incident:", err);
    res.status(500).json({ error: "Failed to fetch incident" });
  }
});

/**
 * @route   POST /incidents
 * @desc    Create a new incident (FIR auto-generated)
 */
router.post("/", async (req, res) => {
  try {
    const { crimeType, location, confidential, date, description } = req.body;

    // Validate required fields
    if (!crimeType || !location || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const incident = new Incident({
      crimeType,
      location,
      date,
      description,
      confidential: !!confidential,
    });

    await incident.save();
    res.status(201).json({
      message: "Incident created",
      incident: incident.toJSON(),
    });
  } catch (err) {
    console.error("Error creating incident:", err);
    res.status(400).json({ error: "Failed to create incident", details: err.message });
  }
});

/**
 * @route   PUT /incidents/:id
 * @desc    Update an incident
 */
router.put("/:id", async (req, res) => {
  try {
    const updateData = req.body;

    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedIncident) {
      return res.status(404).json({ error: "Incident not found" });
    }

    res.json({
      message: "Incident updated",
      incident: updatedIncident.toJSON(),
    });
  } catch (err) {
    console.error("Error updating incident:", err);
    res.status(400).json({ error: "Failed to update incident", details: err.message });
  }
});

/**
 * @route   DELETE /incidents/:id
 * @desc    Delete an incident
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedIncident = await Incident.findByIdAndDelete(req.params.id);

    if (!deletedIncident) {
      return res.status(404).json({ error: "Incident not found" });
    }

    res.json({ message: "Incident deleted" });
  } catch (err) {
    console.error("Error deleting incident:", err);
    res.status(500).json({ error: "Failed to delete incident" });
  }
});

export default router;
