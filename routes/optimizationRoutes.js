// optimizationRoutes.mjs
import express from "express";
import optimizationController from "../controllers/optimizationController.js";

const router = express.Router();

// Define routes
router.post("/optimize-shelf-space", optimizationController.optimizeShelfSpace);

export default router;
