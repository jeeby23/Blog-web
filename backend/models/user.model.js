import mongoose from "mongoose";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire: {
        type:Date
    }

}, {timestamps:true})

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000)
    return resetToken
}

export default mongoose.model('User', userSchema)