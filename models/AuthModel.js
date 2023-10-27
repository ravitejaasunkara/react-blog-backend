const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema(
    {
        displayName:{
            type:String,
            required:true,
            validate: {
                validator: function(value) {
                    // Use a regular expression to check if the displayName contains only alphabetic characters without spaces.
                    return /^[a-z A-Z]+$/.test(value);
                },
                message: 'displayName must contain only alphabetic characters and space.'
            }
        },
        email:{
            type:String,
            required:true,
            validate: {
                validator: function(value) {
                    // Use a regular expression to check for a valid email format.
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Invalid email format.'
            }
        },
        password:{
            type:String,
            required:true,
            validate: {
                validator: function(value) {
                    // Use a regular expression to check for a strong password.
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/.test(value);
                },
                message: 'Password must contain at least 8 characters, including one lowercase letter, one uppercase letter, one digit, and one special character.'
            }
        },
        avatar:{
            type:String,
            required:true
        },
        hashedPassword:{
            type:String
        }
    },
    {
        strict:true,
        timestamps:true
    }
);
const AuthModel = mongoose.model('AuthModel',AuthSchema,'BlogAuthData');
module.exports = AuthModel;