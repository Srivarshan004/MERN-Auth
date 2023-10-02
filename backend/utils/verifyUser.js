const ErrorHandler = require('./errorHandler')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if(!token) return next(new ErrorHandler('You need to Login', 401))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(new ErrorHandler("Invalid Token", 403))
        req.user = user

        next()
    })
}

module.exports = { verifyToken }