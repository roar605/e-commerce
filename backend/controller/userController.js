import handleAsyncError from "../middleware/handleAsyncError.js";
import crypto from "crypto"
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = handleAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "This is temp id",
            url: "This is temp url"
        }
    })
    sendToken(user, 201, res)
})

//login
export const loginUser = handleAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HandleError("Email and password cannot be empty"), 400)
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new HandleError("Invalid email or password"), 401);
    }
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
        return next(new HandleError("Wrong password"), 401);
    }
    sendToken(user, 200, res)
})

//logout
export const logoutUser=handleAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:false,
        message:"Successfully logged out"
    })
})

//Forgot password
export const requestPasswordReset=handleAsyncError(async(req,res,next)=>{
    const {email}=req.body;
    const user=await User.findOne({email})
    if(!user){
        return next(new HandleError("User does not exists",400))
    }
    let resetToken;
    try {
        resetToken=user.generatePasswordResetToken()
        await user.save({validateBeforeSave:false})
    } catch (error) {
        return next(new HandleError("Error Try again",500))
    }
    const resetPasswordUrl=`http://localhost/api/v1/reset/${resetToken}`
    const message=`Use the following link to reset your password : ${resetPasswordUrl}.\n\n
    This link will expire in 30 minutes.\n\n If you did not request a password reset,please ignore this message.`;
    try {
        //Send email
        await sendEmail({
            email:user.email,
            subject:'Password reset request',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email is sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false})
        return next(new HandleError("Email could not be sent.Try again later"),500);
    }
})

//Reset password
export const resetPassword = handleAsyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user =await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})
    if(!user){
        return next(new HandleError("Reset password token is invalid or expired.Try again later.",400))
    }
    const {password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return next(new HandleError("Password does not match.",400))
    }
    user.password=password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res)

})

//get user details
export const getUserDetails = handleAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

//update password
export const updatePassword = handleAsyncError(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body;
    
})
