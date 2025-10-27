import express from "express";
import { getStatus } from "../controllers/statusController.js";

const statusRoutes = express.Router();
statusRoutes.get("/", getStatus);

export default statusRoutes;
