// UserModel.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
	// Add other fields as needed
});

// Hash the user's password before saving it to the database
userSchema.pre("save", async function (next) {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(this.password, saltRounds);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

// Validate the user's password
userSchema.methods.validatePassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw new Error(`Password validation failed: ${error.message}`);
	}
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;