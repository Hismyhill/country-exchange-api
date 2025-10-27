import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "countries_db",
    dialect: "mysql",
    logging: false,
  },
  apis: {
    countries: process.env.COUNTRIES_API,
    exchange: process.env.EXCHANGE_API,
  },
  imagePath: process.env.IMAGE_CACHE_PATH || "cache/summary.png",
};

export default config;
