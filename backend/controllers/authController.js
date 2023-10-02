const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const jwt = require('jsonwebtoken')

const register = catchAsyncError(async (req, res, next) => {
    const { username, email, password } = req.body;
    //const newUser = new User({ username, email, password})
    const hashPassword = bcrypt.hashSync(password, 10);
    try {
        const newUser = await User.create({ username, email, password: hashPassword });
        await newUser.save()
        // console.log(newUser);
        res.status(200).json({
            success: true,
            message: 'Registration successful',
            newUser,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again later.',
        });
        // next(error)
        //next(new ErrorHandler(300, 'Someting Went Wrong'))   
    }
})


const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next(new ErrorHandler('Please enter email & password'))
        }

        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(new ErrorHandler('User not found', 401))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(new ErrorHandler('Incorrect Password', 401))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashPassword, ...rest } = validUser._doc;
        const expireDate = new Date(Date.now() + 3600000); //1 hour
        res.status(200).cookie('token', token, { httpOnly: true, expires: expireDate }).json({
            success: true,
            token,
            rest
        });
    } catch (error) {
        next(error)
    }
})

const googleAuth = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: hashPassword, ...rest } = user._doc;
            const expireDate = new Date(Date.now() + 3600000); //1 hour
            res.status(200).cookie('token', token, { httpOnly: true, expires: expireDate }).json({
                success: true,
                token,
                rest
            });
        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword = bcrypt.hashSync(generatePassword, 10);
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashPassword,
                image: req.body.image
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashPassword2, ...rest } = newUser._doc;
            const expireDate = new Date(Date.now() + 3600000); //1 hour
            res.status(200).cookie('token', token, { httpOnly: true, expires: expireDate }).json({
                success: true,
                token,
                rest
            });
        }
    } catch (error) {
        next(error)
    }
})

const logout = (req, res) => {
    res.clearCookie('token').status(200).json('Logout Successfully')
} 

module.exports = { register, login, googleAuth, logout }