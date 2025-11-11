// server.js
import express from "express";
const app = express();

app.use(express.json());

app.get("/api/incidents", (req, res) => {
  res.json({ incidents: [] });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
