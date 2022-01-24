const JwtControl = require('../utils/jsonwebtoken/controller');
const User = require('../api/user/user.model');
const { setError } = require('../utils/error/controller');


const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(setError(404, 'Unauthorized'))
        }
        const parsedToken = token.replace('Bearer ', '');
        const validToken = JwtControl.verify(parsedToken, process.env.JWT_SECRET)
        const userLogued = await User.findById(validToken.id)
        userLogued.password = null
        req.user = userLogued
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    isAuth
}