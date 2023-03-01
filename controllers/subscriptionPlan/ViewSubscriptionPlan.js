const Plan = require("../../models/subscriptionPlan");
const ViewSubscriptionPlan = async (req, res) => {
	try {
		const plan = await Plan.find();
		if (!plan) {
			res.json({
                message: "No plan found",
                status:false,
            });
		} else {
			res.json({
                message: "plan Data!",
                status:true,
				plan
            });
		}
	} catch (err) {
		res.json({
			message: "Error!",
			status: false,
		});
	}
};
module.exports = ViewSubscriptionPlan;