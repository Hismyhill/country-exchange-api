// src/controllers/statusController.js
import Country from "../models/country.js";

export const getStatus = async (req, res) => {
  try {
    const total = await Country.count();
    const latest = await Country.max("last_refreshed_at");
    res.json({
      total_countries: total,
      last_refreshed_at: latest || null,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
