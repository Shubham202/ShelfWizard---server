// productService.js
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

const getProductByName = async productName => {
	try {
		const product = await ProductModel.findOne({ name: productName });
		return product;
	} catch (error) {
		throw new Error(`Error fetching product by name: ${error.message}`);
	}
};

const createProduct = async ({
	name,
	category,
	rating,
	costPrice,
	sellingPrice
}) => {
	try {
		// Create a new product instance
		const newProduct = new ProductModel({
			name,
			category,
			rating,
			costPrice,
			sellingPrice
		});

		// Save the new product to the database
		await newProduct.save();

		// Return the newly created product data
		return newProduct;
	} catch (error) {
		throw new Error(`Product creation failed: ${error.message}`);
	}
};
const deleteProductByName = async productName => {
	try {
		// Find and remove the product with the specified name
		await ProductModel.findOneAndDelete({ name: productName });

		// You can also use ProductModel.deleteOne({ name: productName }) for a similar effect

		// No need to return anything for deletion
	} catch (error) {
		throw new Error(`Product deletion failed: ${error.message}`);
	}
};

export default {
	getAllProducts,
	getProductById,
	getProductByName,
	createProduct,
	deleteProductByName // Add the new function to the export
};
