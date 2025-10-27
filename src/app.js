import express from "express";
import bodyParser from "body-parser";
import routes from "./route.js";
import config from "./config/config.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Health route
app.get("/status", (req, res) => {
  return res.json({ message: "server running", env: config.env });
});
app.use("/api", routes);
// Error handler (JSON)
app.use((err, req, res, next) => {
  // send JSON for errors
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
});

export default app;
