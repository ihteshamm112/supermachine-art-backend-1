const Plan = require("../../models/usersSubscriptions");
const User = require("../../models/User");

const availSubscription = async (req, res) => {
    try {
        const { userID, name , email , subscriptionID } = req.body;
        const date = new Date();
        const plan = await new Plan({ userID, name , email ,subscriptionID, date });
        const result = await User.findOneAndUpdate({ _id: userID },
            {
                type: 'subscriber',
            },
            {
                new: true
            })
        if (!result) {
            res.json({
                message: "Subscription Failed",
                status:false,
s            });
        } else {
            plan.save();
            res.json({
                message: "Subscribed Successfully!",
                status:true,
                plan,
            });
        }
    } catch (err) {
        res.json({
            message: "Error!",
            status: false,
        });
    }
};
module.exports = availSubscription;