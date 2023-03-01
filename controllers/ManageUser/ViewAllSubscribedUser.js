const Users = require("../../models/User");
const ViewAllSubscribedUser = async (req, res) => {
	try {
		// const {  } = req.body;
		const users = await Users.find({ type: "subscriber" });
		console.log(users);
		if (!users) {
			res.json({
				message: "No Users found!",
				status: false,
			});
		} else {
			res.json(users);
			res.json({
				message: "Users found!",
				status: true,
				users
			});

		}
	} catch (err) {
		res.json({
			message: "error",
			status: false,
		});
	}
};
module.exports = ViewAllSubscribedUser;