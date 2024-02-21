import express from "express";
import shelfController from "../controllers/shelfController.js";

const router = express.Router();

// application.get('/', );
router.post("/seasonal", shelfController.getSeasonal);
// application.get('/margin-profit', );
// application.get('/rating', );

export default router;
