// authService.mjs
import User from "../models/UserModel.js"; // Import the User model

const login = async (email, password) => {
	// Implement login service logic
	try {
		// Find the user with the provided email in the database
		const user = await User.findOne({ email });

		// Check if the user exists and validate the password (you should add your password validation logic)
		if (!user || !user.validatePassword(password)) {
			throw new Error("Invalid email or password");
		}

		// Return the user data (you might also generate and return a token)
		return user;
	} catch (error) {
		throw new Error(`Login failed: ${error.message}`);
	}
};

const register = async (email, password /* other registration data */) => {
	// Implement register service logic
	try {
		// Check if the email is already registered
		if (await User.findOne({ email })) {
			throw new Error("Email is already registered");
		}

		// Create a new user instance
		const newUser = new User({
			email,
			password /*, other registration data */
		});

		// Save the new user to the database
		await newUser.save();

		// Return the newly registered user data
		return newUser;
	} catch (error) {
		throw new Error(`Registration failed: ${error.message}`);
	}
};

export default {
	login,
	register
};