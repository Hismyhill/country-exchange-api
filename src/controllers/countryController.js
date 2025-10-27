import fs from "fs";
import path from "path";
import Country from "../models/country.js";
import { refreshCountries } from "../services/refreshService.js";

export const refresh = async (req, res) => {
  try {
    const result = await refreshCountries();
    res.status(200).json(result);
  } catch (err) {
    res.status(503).json({
      error: "External data source unavailable",
      details: err.message,
    });
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const { region, currency, sort } = req.query;

    const where = {};
    if (region) where.region = region;
    if (currency) where.currency_code = currency;

    const order = [];
    if (sort === "gdp_desc") order.push(["estimated_gdp", "DESC"]);
    if (sort === "gdp_asc") order.push(["estimated_gdp", "ASC"]);

    const countries = await Country.findAll({ where, order });
    res.status(200).json(countries);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

export const getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    // const country = await Country.findOne({
    //   where: Country.sequelize.where(
    //     Country.sequelize.fn("lower", Country.sequelize.col("name")),
    //     name.toLowerCase()
    //   ),
    // });

    const country = await Country.findOne({
      where: { name },
    });

    if (!country) return res.status(404).json({ error: "Country not found" });
    res.json(country);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCountry = async (req, res) => {
  try {
    const { name } = req.params;
    // const count = await Country.destroy({
    //   where: Country.sequelize.where(
    //     Country.sequelize.fn("lower", Country.sequelize.col("name")),
    //     name.toLowerCase()
    //   ),
    // });
    const deleted = await Country.destroy({
      where: { name },
    });
    if (!deleted) return res.status(404).json({ error: "Country not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSummaryImage = async (req, res) => {
  const imagePath = path.resolve("cache/summary.png");
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: "Summary image not found" });
  }
};
