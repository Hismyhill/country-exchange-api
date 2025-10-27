import express from "express";
import countryRoutes from "./routes/countryRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";

const routes = express();

routes.use("/countries", countryRoutes);
routes.use("/status", statusRoutes);

export default routes;
