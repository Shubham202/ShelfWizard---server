import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);

router.post("/", productController.createProduct);

router.delete("/", productController.deleteProductByName);

export default router;
