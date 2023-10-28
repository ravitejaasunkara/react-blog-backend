const { default: mongoose } = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        default:'anonymous@email.com'
    },
    totalBlogs:{
        type:Number,
        default:1
    }
},
{
    timestamps:true
}
);
const AuthorModel = mongoose.model('AuthorModel',AuthorSchema,'AuthorDetails');
module.exports = AuthorModel;