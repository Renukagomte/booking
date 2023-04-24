const jwt = require("jsonwebtoken")

exports.authProtected = (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).json({
            message: "No Cookie found"
        })
    }
    const { token } = req.cookies
    if (!token) {
        return res.status(401).json({
            message: "token missing"
        })
    }
    jwt.verify(token, process.env.JWT_KEY, (err,decode) => {
        console.log(err);
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        const { id, role } = decode

        req.body.userId = id
        req.body.role = role
        next()
    })
}