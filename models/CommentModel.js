const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    commentatorName:{
        type:String,
        default:"anonymous user"
    }
});

const CommentModel = mongoose.model('CommentModel',CommentSchema,'CommentsData');
module.exports = CommentModel;