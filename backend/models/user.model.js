import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    CNIC:{
        type:String,
    },
    avatar: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        select:false,
        trim: true
    },
    resetPasswordToken:{
        type: String,
    }
},{timestamps:true})

const userModel = mongoose.model('User', userSchema,)
export default userModel 