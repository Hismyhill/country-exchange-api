// services/imageService.js
import nodeHtmlToImage from "node-html-to-image";
import fs from "fs";
import path from "path";
import Country from "../models/country.js";

const __dirname = path.resolve();

export async function generateSummaryImage(lastRefreshedAt) {
  try {
    const countries = await Country.findAll({
      order: [["estimated_gdp", "DESC"]],
      limit: 5,
    });

    const totalCountries = await Country.count();
    const topCountries = countries.map(
      (c) => `${c.name} (${c.currency_code || "N/A"})`
    );

    const html = `
      <html>
        <body style="font-family: Arial; text-align:center; padding:30px; background:#f8fafc;">
          <h2 style="color:#2563eb;">🌍 Country Summary</h2>
          <p><b>Total Countries:</b> ${totalCountries}</p>
          <p><b>Last Refreshed:</b> ${new Date(
            lastRefreshedAt
          ).toISOString()}</p>
          <h3 style="margin-top:20px;">Top 5 by Estimated GDP</h3>
          <ol style="list-style:none; padding:0;">
            ${topCountries
              .map(
                (name, i) => `<li style="margin:8px 0;">#${i + 1} ${name}</li>`
              )
              .join("")}
          </ol>
        </body>
      </html>
    `;

    const outputDir = path.join(__dirname, "cache");
    const outputFile = path.join(outputDir, "summary.png");

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    await nodeHtmlToImage({
      output: outputFile,
      html,
      quality: 100,
    });

    console.log("✅ Summary image saved:", outputFile);
    return outputFile;
  } catch (err) {
    console.error("Image generation failed:", err.message);
  }
}
