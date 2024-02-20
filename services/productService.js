import ProductModel from "../models/ProductModel.js";

const getAllProducts = async () => {
	try {
		const products = await ProductModel.find();
		return products;
	} catch (error) {
		throw new Error(`Error fetching products: ${error.message}`);
	}
};

const getProductById = async productId => {
	try {
		const product = await ProductModel.findById(productId);
		return product;
	} catch (error) {
		throw new Error(`Error fetching product by ID: ${error.message}`);
	}
};

const createProduct = async ({
	name,
	sales,
	reviews,
	seasonality,
	profitMargin
}) => {
	try {
		// Create a new product instance
		const newProduct = new ProductModel({
			name,
			sales,
			reviews,
			seasonality,
			profitMargin
		});

		// Save the new product to the database
		await newProduct.save();

		// Return the newly created product data
		return newProduct;
	} catch (error) {
		throw new Error(`Product creation failed: ${error.message}`);
	}
};

export default {
	getAllProducts,
	getProductById,
	createProduct
};
