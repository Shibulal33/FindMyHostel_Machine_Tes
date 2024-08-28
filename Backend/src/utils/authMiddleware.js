const jwt = require('jwt')
const { secretKey } = require("../config/jwtConifg")

function authenticateToken(req, res, next) {
    const authHeader = req.header("Autherization")

    if (!authHeader) {
        return res.status(401).json({
            message: "Unautherized: Missing token!."
        })
    }

    const [bearer, token] = authHeader.split(" ")
    if (bearer !== "Bearer" || !token) {
        message: "Unautherized: Invalid token format"
    }

    jwt.verify(token, secretKey, (error, user) => {
        if (error) {
            return res.status(403).json({
                message: "Forbidden: Invalid Token"
            })
        }
        req.user = user
        next()
    })
}

module.exports = {
    authenticateToken
}