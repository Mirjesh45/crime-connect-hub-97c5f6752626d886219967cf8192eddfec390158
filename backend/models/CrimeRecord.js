// backend/models/CrimeRecord.js
import mongoose from "mongoose";

const CrimeRecordSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
});

// Register model
const CrimeRecord = mongoose.model("CrimeRecord", CrimeRecordSchema);

export default CrimeRecord;
