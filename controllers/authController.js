import authService from "../services/authService.js";
import User from "../models/UserModel.js";

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const user = await authService.login(email, password);
		const isPasswordValid = await user.validatePassword(password);
		
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Incorrect password" });
		}
		res.status(200).json({ user, message: "Login successful" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const register = async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(400)
				.json({ message: "User already exists with this email" });
		}

		const newUser = await authService.register(email, password);

		res.status(201).json({
			user: newUser,
			message: "Registration successful"
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export default {
	login,
	register
};
