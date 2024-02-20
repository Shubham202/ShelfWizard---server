// database.mjs
import mongoose from "mongoose";

const connectToDatabase = async () => {
	try {
		mongoose.set("strictQuery", true);
		await mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true });

		console.log("Connected to the database...");
	} catch (error) {
		console.error("Error connecting to the database:", error.message);
	}
};

export default connectToDatabase;