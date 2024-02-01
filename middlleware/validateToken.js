const jwt = require('jsonwebtoken');
const extrackDataFromToken = require("../commonFunc/getToken.js")


const validateToken = async (req, res, next) => {
    const token = await req.cookies.DO_NOT_SHARE;
    try {
        const respData = await extrackDataFromToken(token);
        if (respData && respData?.hasOwnProperty("status") && respData?.status === 200) {
            req.userData = respData?.data;
            next()
        } else {
            return res.status(respData?.status).json({ msg: respData?.msg })
        }
        // if (!token) {
        //     return res.status(401).json({ message: 'Unauthorized: Missing token' });
        // }
        // jwt.verify(token, 'kUCHbji21@8*2dd', (err, decoded) => {
        //     if (err) {
        //         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        //     }

        //     // Attach the decoded user information to the request for further use
        //     req.userData = decoded;
        //     next();
        // });
    } catch (error) {
        return res.status(400).json({ msg: "CATHC ERROR", error })
    }
}

module.exports = validateToken;