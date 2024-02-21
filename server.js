import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import connectToDatabase from "./config/database.js";

import productRoutes from "./routes/productRoutes.js";
import optimizationRoutes from "./routes/optimizationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import shelfRoutes from "./routes/shelfRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

connectToDatabase();

app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/optimized-products", optimizationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shelf", shelfRoutes);

app.use((req, res) => {
	res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () =>
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}... http://localhost:${port}/`
	)
);
