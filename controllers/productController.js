import productService from "../services/productService.js";

const getAllProducts = async (req, res) => {
	const products = await productService.getAllProducts();
	res.json(products);
};

const getProductById = async (req, res) => {
	const productId = req.params.productId;
	const product = await productService.getProductById(productId);
	res.json(product);
};

export default {
	getAllProducts,
	getProductById
};