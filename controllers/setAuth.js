const extractDataFromToken = require("../commonFunc/getToken");

const setAuth = async (req, res) => {
    const { DO_NOT_SHARE } = req.cookies;
    const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const frontendUrl = req.get('referer') || 'Unknown';
    console.log("current url is ", frontendUrl);

    let rData = {}
    if (DO_NOT_SHARE) {
        const respData = await extractDataFromToken(DO_NOT_SHARE);
        if (respData && respData?.hasOwnProperty("status") && respData?.status === 200) {
            rData = respData?.data;
            //fetching data of user using its id 
            return res.status(200).json({ msg: "successfull", rData })
        } else {
            return res.status(401).json({ msg: "unauthorize" })
        }
    }
    return res.status(401).json({ msg: "unauthorize" });
}


module.exports = { setAuth }