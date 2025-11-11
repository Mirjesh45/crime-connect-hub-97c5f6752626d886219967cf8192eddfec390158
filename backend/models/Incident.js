import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  name: String,
  phone: String,
  idNumber: String,
  notes: String,
});

const IncidentSchema = new mongoose.Schema(
  {
    crimeType: { type: String, required: true },
    status: { type: String, enum: ["Active", "Closed"], default: "Active" },
    location: { type: String, required: true },
    date: { type: String, required: true },
    description: String,
    confidential: { type: Boolean, default: false },
    password: String,
    firNumber: { type: String, unique: true }, // auto generated
    location_lat: Number,
    location_lng: Number,
    location_address: String,
    suspects_enc: [PersonSchema],
    victims_enc: [PersonSchema],
    evidence_links: [String],
  },
  { timestamps: { createdAt: "created_at" } }
);

// ✅ Virtual alias for _id
IncidentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

IncidentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

// ✅ Auto-generate FIR number before saving
IncidentSchema.pre("save", async function (next) {
  if (!this.firNumber) {
    try {
      const count = await mongoose.model("Incident").countDocuments();
      const year = new Date().getFullYear();
      this.firNumber = `FIR-${year}-${String(count + 1).padStart(3, "0")}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export default mongoose.model("Incident", IncidentSchema);
