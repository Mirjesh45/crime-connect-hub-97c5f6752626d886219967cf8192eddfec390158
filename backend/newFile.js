import path from "path";
import { app, __dirname } from ".";

// Catch-all route for SPA using named wildcard (Express v5 compatible)
// Catch-all route for React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
