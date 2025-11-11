import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";   // ✅ import your auth middleware

const router = express.Router();

const baseOptions = { timestamps: true };

// --- SCHEMAS ---
const cdrSchema = new mongoose.Schema({
  firNumber: { type: String, required: true },
  phoneNumber: String,
  callType: String,
  duration: Number,
  timestamp: Date,
  location: String,
  notes: String,
}, baseOptions);

const bankSchema = new mongoose.Schema({
  firNumber: { type: String, required: true },
  accountNumber: String,
  bankName: String,
  accountHolder: String,
  transactionDate: Date,
  amount: Number,
  transactionType: String,
  description: String,
  notes: String,
}, baseOptions);

const idprSchema = new mongoose.Schema({
  firNumber: { type: String, required: true },
  documentType: String,
  documentNumber: String,
  holderName: String,
  dateOfBirth: Date,
  address: String,
  issueDate: Date,
  expiryDate: Date,
  issuingAuthority: String,
  notes: String,
}, baseOptions);

const CDR = mongoose.model("CDR", cdrSchema);
const Bank = mongoose.model("Bank", bankSchema);
const IDPR = mongoose.model("IDPR", idprSchema);

// --- PROTECTED INGEST ROUTE ---
router.post("/raw", auth, async (req, res) => {
  try {
    const { firNumber, type, data } = req.body;

    if (!firNumber || !type || !data) {
      return res.status(400).json({
        detail: "FIR number, type, and data are required",
      });
    }

    let doc;
    switch (type.toUpperCase()) {
      case "CDR":
        doc = new CDR({ firNumber, ...data });
        break;
      case "BANK":
        doc = new Bank({ firNumber, ...data });
        break;
      case "IDPR":
        doc = new IDPR({ firNumber, ...data });
        break;
      default:
        return res.status(400).json({
          detail: "Invalid type. Must be CDR, BANK, or IDPR",
        });
    }

    await doc.save();

    return res.status(201).json({
      message: `${type} data saved successfully`,
      data: doc,
    });
  } catch (err) {
    console.error("Error saving data:", err);
    return res.status(500).json({
      detail: "Failed to save data",
      error: err.message,
    });
  }
});

export default router;
