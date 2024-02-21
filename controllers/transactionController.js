import transactionService from "../services/transactionService.js";
import TransactionModel from "../models/TransactionModel.js";

const uploadTransaction = async (req, res) => {
	try {
		const { invoiceId, products, costPrice, sellingPrice, date } = req.body;

		// Check if a transaction with the same details already exists
		const existingTransaction = await TransactionModel.findOne({
			invoiceId
		});

		if (existingTransaction) {
			// Transaction with the same invoiceId already exists
			return res.status(400).json({
				message: "Transaction with this invoice id already exists"
			});
		}

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

		// Send response with the newly uploaded transaction data
		res.status(201).json({
			transaction: newTransaction,
			message: "Transaction uploaded successfully"
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getAllTransactions = async (req, res) => {
	try {
		// Call transactionService to get all transactions
		const transactions = await transactionService.getAllTransactions();

		// Send response with the list of transactions
		res.status(200).json(transactions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export default {
	uploadTransaction,
	getAllTransactions
};
