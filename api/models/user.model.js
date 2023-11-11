import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"data:image/png;base64,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"
    }
}, {timestamps:true});

const User= mongoose.model('User',userSchema);

export default User;
