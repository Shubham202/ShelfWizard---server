import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	category: { type: String, required: true },
	costPrice: { type: Number, required: true },
	sellingPrice: { type: Number, required: true },
	rating: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
		validate: {
			validator: Number.isInteger,
			message: "Rating must be an integer between 0 and 5"
		}
	}
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;