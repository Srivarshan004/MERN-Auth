const catchAsyncError = require("../middlewares/catchAsyncError")
const ErrorHandler = require("../utils/errorHandler")
const bcrypt = require('bcryptjs')
const User = require('../models/userModel');


const userResponse = (req, res) => {
    res.json({
        message : 'API is Working in User Controller' 
    })
}

//Update User
const updateUser = catchAsyncError( async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(new ErrorHandler('You can update only your account!', 401))
    }

    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    username : req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    image : req.body.image
                }
            },
            {new : true}
        )
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json({
            success : true,
            rest
        })
    } catch (error) {
        next(error)
    }
})

const deleteUser = catchAsyncError( async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(new ErrorHandler('You can delete only your account!', 401))
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User as been deleted...')
    } catch (error) {
        next(error)
    }
})



module.exports = { userResponse, updateUser, deleteUser}
