const PrivacyPolicy = require("../../models/privacyPolicy");

const UpdatePrivacyPolicy = async (req, res) => {
    try {
        const { _id, title,content } = req.body;
        const result = await PrivacyPolicy.findOneAndUpdate({ _id: _id },
            {
                title: title,
                content: content,
            },
            {
                new: true
            })
        if (!result) {
            res.json({
                message: "Privacy Policy not Existeds!",
                result,
            });
        } else {
            res.json({
                message: "Privacy Policy Updated Successfully!",
                result,
            });
        }
    } catch (err) {
        res.json({
            message: "Privacy Policy Updation Failed!",
            status: "none",
            err
        });
    }
};
module.exports = UpdatePrivacyPolicy;