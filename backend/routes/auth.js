import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "police" && password === "admin123") {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  res.status(401).json({ detail: "Invalid credentials" });
});

export default router;
