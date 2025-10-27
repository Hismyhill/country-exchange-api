// services/refreshService.js
import axios from "axios";
import Country from "../models/country.js";
import { generateSummaryImage } from "./imageService.js";

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export async function refreshCountries() {
  const countriesURL =
    "https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies";
  const exchangeURL = "https://open.er-api.com/v6/latest/USD";

  try {
    const [countriesRes, exchangeRes] = await Promise.all([
      axios.get(countriesURL),
      axios.get(exchangeURL),
    ]);

    if (!countriesRes.data || !exchangeRes.data?.rates)
      throw new Error("Invalid API responses");

    const countries = countriesRes.data;
    const rates = exchangeRes.data.rates;
    const lastRefreshedAt = new Date();
    let upsertCount = 0;

    for (const country of countries) {
      const { name, capital, region, population, flag, currencies } = country;
      if (!name || !population) continue;

      let currency_code = currencies?.[0]?.code || null;
      const exchange_rate = currency_code ? rates[currency_code] || null : null;
      const estimated_gdp =
        exchange_rate && exchange_rate > 0
          ? (population * randomBetween(1000, 2000)) / exchange_rate
          : 0;

      await Country.upsert({
        name,
        capital,
        region,
        population,
        currency_code,
        exchange_rate,
        estimated_gdp,
        flag_url: flag,
        last_refreshed_at: lastRefreshedAt,
      });

      upsertCount++;
    }

    // Generate summary image
    await generateSummaryImage(lastRefreshedAt);

    return {
      message: "Countries refreshed successfully",
      total_updated: upsertCount,
      last_refreshed_at: lastRefreshedAt,
    };
  } catch (err) {
    console.error("Refresh failed:", err.message);
    throw new Error("External data source unavailable");
  }
}
