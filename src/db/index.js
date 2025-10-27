// src/db/index.js
// Sequelize initialization
import { Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: config.db.logging,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");
  } catch (err) {
    console.error("❌ Unable to connect to DB:", err.message);
    throw err;
  }
}

export { sequelize, testConnection };
