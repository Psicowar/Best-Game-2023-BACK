const jwt = require("jsonwebtoken");
require('dotenv').config();

const tokenGenerator = (id = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        }, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = tokenGenerator;