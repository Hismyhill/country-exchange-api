// src/routes/countries.js
import express from "express";

import {
  deleteCountry,
  getAllCountries,
  getCountryByName,
  getSummaryImage,
  refresh,
} from "../controllers/countryController.js";
const countryRoutes = express.Router();

// CRUD + refresh endpoints
countryRoutes.post("/refresh", refresh);
countryRoutes.get("/", getAllCountries);
countryRoutes.get("/image", getSummaryImage);
countryRoutes.get("/:name", getCountryByName);
countryRoutes.delete("/:name", deleteCountry);

export default countryRoutes;
