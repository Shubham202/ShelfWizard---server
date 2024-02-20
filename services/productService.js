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

export default {
	getAllProducts,
	getProductById
};
