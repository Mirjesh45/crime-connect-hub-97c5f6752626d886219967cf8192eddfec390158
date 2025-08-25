import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  name: String,
  phone: String,
  idNumber: String,
  notes: String,
});

const IncidentSchema = new mongoose.Schema({
  crimeType: { type: String, required: true },
  status: { type: String, enum: ["Active", "Closed"], default: "Active" },
  location: { type: String, required: true },
  date: { type: String, required: true },
  description: String,
  confidential: { type: Boolean, default: false },
  password: String,
  firNumber: String,
  location_lat: Number,
  location_lng: Number,
  location_address: String,
  suspects_enc: [PersonSchema],
  victims_enc: [PersonSchema],
  evidence_links: [String],
}, { timestamps: { createdAt: "created_at" } });

export default mongoose.model("Incident", IncidentSchema);
