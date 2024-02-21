import shelfService from "../services/shelfService.js";

const getSeasonal = async (req, res) => {
	try {
		const { season } = req.body;
		if (!season) {
			return res
				.status(400)
				.json({ error: "Season is required in the request body" });
		}

		const products = await shelfService.seasonal(season);
		res.json(products);
	} catch (error) {
		console.error(`Error in getSeasonal: ${error.message}`);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export default {
	getSeasonal
};
