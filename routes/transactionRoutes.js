// transactionRoutes.js
import express from "express";
import transactionController from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", transactionController.getAllTransactions);

// POST route for manually uploading transaction details
router.post("/", transactionController.uploadTransaction);

export default router;
