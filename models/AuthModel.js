const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema(
    {
        displayName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        avatar:{
            type:String,
            required:true
        }
    },
    {
        strict:true,
        timestamps:true
    }
);
const AuthModel = mongoose.model('AuthModel',AuthSchema,'BlogData');
module.exports = AuthModel;