const jwt = require('jsonwebtoken');

const extractDataFromToken = async (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject({ status: 401, msg: "Token not provided" });
        }

        jwt.verify(token, 'kUCHbji21@8*2dd', (err, decoded) => {
            if (err) {
                reject({ status: 401, msg: "Invalid token" });
            } else {
                resolve({ status: 200, data: decoded });
            }
        });
    });
};

module.exports = extractDataFromToken;
