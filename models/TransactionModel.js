import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
	invoiceId: { type: String, required: true },
	products: [
		{
			productName: { type: String, required: true },
		}
	],
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
	date: { type: Date, default: Date.now }
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
