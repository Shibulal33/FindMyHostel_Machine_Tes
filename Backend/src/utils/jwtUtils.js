const jwt = require("jsonwebtoken")
const { secretKey } = require('../config/jwtConifg')

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, secretKey, {
        algorithm: 'HS256',
        expiresIn: "1h"
    })
}

module.exports = {
    generateToken
}