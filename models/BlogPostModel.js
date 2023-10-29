const mongoose = require('mongoose');

const BlogPostSchema = mongoose.Schema(
    {
        blogTitle:{
            type:String,
            required:true
        },
        blogDescription:{
            type:String,
            required:true
        },
        blogThumbnail:{
            type:String,
            required:true
        },
        blogMarkdown:{
            type:String,
            required:true
        },
        blogTags:{
            type:[String],
            default:[]
        }
    },
    {
        strict:true,
        timestamps:true
    }
);
const BlogPostModel = mongoose.model('BlogPostModel',BlogPostSchema,'BlogPostsData');
module.exports = BlogPostModel;
