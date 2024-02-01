const { UserModel } = require("../models/user");

const validateUserMail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(401).json({ success: false, msg: "No Email found" })
    }
    const userData = await UserModel.find({ email });
    if (!userData || userData?.length === 0) {
        return res.status(400).json({ success: false, msg: "User does not exist!" });
    }

    return res.status(200).json({ success: true, msg: "User Exist" })
}

const fetchUsers = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(401).json({ success: false, msg: "No email found!" })
    }
    const users = await UserModel.find({
        email: { $regex: new RegExp(email, 'i') },
    });
    if (!users || users?.length < 1) {
        return res.status(401).json({ success: false, msg: "No email found!" })
    }
    return res.status(200).json({ success: true, rData: users })

}

module.exports = { validateUserMail, fetchUsers }
