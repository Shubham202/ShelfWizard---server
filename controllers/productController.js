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
		const { name, category, rating, costPrice, sellingPrice } = req.body;

		// Check if a product with the same name already exists
		const existingProduct = await productService.getProductByName(name);

		if (existingProduct) {
			// Product with the same name already exists
			return res
				.status(400)
				.json({ message: "Product with this name already exists" });
		}

		// Proceed with creating a new product
		const newProduct = await productService.createProduct({
			name,
			category,
			rating,
			costPrice,
			sellingPrice
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
const deleteProductByName = async (req, res) => {
	try {
		const productName = req.body.name;

		// Check if a product with the specified name exists
		const existingProduct = await productService.getProductByName(
			productName
		);

		if (!existingProduct) {
			// Product with the specified name does not exist
			return res.status(404).json({ message: "Product not found" });
		}

		// Proceed with deleting the product
		await productService.deleteProductByName(productName);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export default {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProductByName // Add the new function to the export
};
