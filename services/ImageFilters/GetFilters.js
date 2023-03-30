const db = require("../../models");
const ImageFilters = db.ImageFilters;

const GetFilters = async (req, res) => {
	try {
		// const {  id} = req.body;
		const result = await ImageFilters.findAll();
		if (!result) {
			res.json({
				message: "No Image Filters found!",
				status: false,
			});
		} else {
			res.json({
				message: "Filter Data!",
				status: true,
				result
			});
		}

	} catch (err) {
		res.json({
			message: "error",
			status: false,
		});
	}
};
module.exports = GetFilters;