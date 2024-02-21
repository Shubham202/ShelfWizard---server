import optimizationService from "../services/optimizationService.js";

const optimizeShelfSpace = async (req, res) => {
	try {
		// Call optimizationService to handle shelf space optimization logic
		const optimizedLayout = await optimizationService.optimizeShelfSpace();

		// Send response with the optimized shelf layout
		res.status(200).json({
			optimizedLayout,
			message: "Shelf space optimization successful"
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export default {
	optimizeShelfSpace
};
