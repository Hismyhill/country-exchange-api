import app from "./app.js";
import config from "./config/config.js";
import { sequelize, testConnection } from "./db/index.js";

const PORT = config.port;

async function start() {
  try {
    await testConnection();
    // ensure DB sync is manual later (we won't force sync now). Caller can run migrations.
    app.listen(PORT, () => {
      console.log(
        `🚀 Server started on http://localhost:${PORT} (env=${config.env})`
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

sequelize.sync();

start();
