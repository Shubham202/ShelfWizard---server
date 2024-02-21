import TransactionModel from "../models/TransactionModel.js";

const uploadTransaction = async ({
	invoiceId,
	products,
	costPrice,
	sellingPrice,
	date
}) => {
	try {
		// Create a new transaction instance
		const newTransaction = new TransactionModel({
			invoiceId,
			products: products.map(productName => ({ productName })),
			costPrice,
			sellingPrice,
			date
		});

		// Save the new transaction to the database
		await newTransaction.save();

		// Return the newly uploaded transaction data
		return newTransaction;
	} catch (error) {
		throw new Error(`Transaction upload failed: ${error.message}`);
	}
};

const getAllTransactions = async () => {
	try {
		// Fetch all transactions from the database
		const transactions = await TransactionModel.find();

		// Return the list of transactions
		return transactions;
	} catch (error) {
		throw new Error(`Error fetching transactions: ${error.message}`);
	}
};

export default {
	uploadTransaction,
	getAllTransactions // Add the new function to the export
};
