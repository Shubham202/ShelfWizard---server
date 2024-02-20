import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	sales: { type: Number, required: true },
	reviews: { type: Number, required: true },
	seasonality: { type: String, required: true },
	profitMargin: { type: Number, required: true }
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
