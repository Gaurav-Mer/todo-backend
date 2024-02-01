const { UserModel } = require("../models/user");

const fetchProfileData = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ msg: "No user id found" })
    }
    //fetch user details using userId;
    const userData = await UserModel.findById(id);
    console.log('USER DATa ', userData);
    if (!userData) {
        return res.status(400).json({ msg: "No Data found!" })
    }

    const respData = {
        name: userData?.name,
        email: userData?.email,
        avatar: userData?.avatar,
        role: userData?.role,
        id: userData?._id
    }

    return res.status(200).json({ rData: respData })
}

module.exports = { fetchProfileData };