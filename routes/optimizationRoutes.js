// optimizationRoutes.mjs
import express from "express";
import optimizationController from "../controllers/optimizationController.js";

const router = express.Router();

// Route to trigger the optimization process
router.get("/", optimizationController.optimizeShelfSpace);

export default router;
