const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataEntrySchema = new Schema({
  firNumber: { type: String, required: true },
  type: { type: String, enum: ["CDR", "BANK", "IDPR"], required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DataEntry", dataEntrySchema);
