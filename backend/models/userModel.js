import mongoose from "mongoose";
import validator from "validator"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        maxLength: [25, "Invalid, characters must be fewer than 25."],
        minLength: [2, "NAme should be more than 2 characters."]
    },
    email: {
        type: String,
        required: [true, "Please enter name"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password must be atleast 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true })

//password hashing
userSchema.pre("save", async function (next) {
    this.password = await bcryptjs.hash(this.password, 10)

    if (!this.isModified("password")) {
        return next
    }
});

//custom method for token generation
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//custom method to verify password while logging in
userSchema.methods.verifyPassword = async function (userEnteredPassword) {
    return await bcryptjs.compare(userEnteredPassword, this.password)
}

//custom method generating token
userSchema.methods.generatePasswordResetToken=function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
}

export default mongoose.model("User", userSchema);
