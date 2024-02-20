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
const createProduct = async (req, res) => {
	try {
		const { name, sales, reviews, seasonality, profitMargin } = req.body;

		// Validate product data (add your validation logic here)

		// Call productService to handle product creation logic
		const newProduct = await productService.createProduct({
			name,
			sales,
			reviews,
			seasonality,
			profitMargin
		});

		// Send response with the newly created product
		res.status(201).json({
			product: newProduct,
			message: "Product created successfully"
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export default {
	getAllProducts,
	getProductById,
	createProduct // Add the new function to the export
};