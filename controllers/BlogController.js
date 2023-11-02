const contactModel = require('../models/ContactModel')
const blogPostModel = require('../models/BlogPostModel');
const { SuccessResponse, ErrorResponse } = require('../utils/Response');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const authModel = require('../models/AuthModel');
const authorModel = require('../models/AuthorModel');
const blogModel = require('../models/BlogPostModel');
const commentModel = require('../models/CommentModel');
const { ObjectId } = require('mongodb');

exports.saveContactData = async (req, res) => {
    try {
        const data = await contactModel.create(req.body);
        SuccessResponse(res, data, "Data posted successfully!!");
    } catch (error) {
        ErrorResponse(res, data, error?.error);
    }
}
exports.getAllBlogs = async (req, res) => {
    const data = await blogPostModel.find({});
    if (data?.length > 0) {
        SuccessResponse(res, data, 'Data fetched successfully.');
    } else {
        ErrorResponse(res, data, 'No data found.');
    }
}

exports.signup = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req?.body?.password, saltRounds);
    const newData = { ...req?.body, hashedPassword };
    const isUserExist = await authModel.find({ email: req?.body?.email });
    if (isUserExist.length > 0) {
        ErrorResponse(res, { username: isUserExist[0]?.displayName }, "User already registered");
    } else {
        try {
            const user = await authModel.create(newData);
            console.log('User', user);
            SuccessResponse(res, { username: user?.displayName, email: user?.email }, "Successfully registered")
        } catch (error) {
            ErrorResponse(res, [], error?.message);
        }
    }
}

exports.login = async (req, res) => {
    const { email, password } = req?.body;
    const checkUserExist = await authModel.findOne({ email: email });
    if (checkUserExist == null) {
        ErrorResponse(res, { email: email }, "User not found.");
        return;
    }
    if (!(await bcrypt.compare(password, checkUserExist?.hashedPassword))) {
        ErrorResponse(res, { email: email }, "Email or Password is wrong please check.");
        return;
    }
    SuccessResponse(res, { email: email, username: checkUserExist?.displayName,joined:checkUserExist?.createdAt }, "Login successful.");
}

exports.saveAuthor = async (req, res) => {
    try {
        const data = await authorModel.findOne({ name: req?.body?.name });
        if (data === null) {
            const resp = await authorModel.create(req?.body);
            SuccessResponse(res, { name: resp?.name, totalBlogs: resp?.totalBlogs }, "Author saved");
        } else {
            const newResp = { name: data?.name, email: data?.email, totalBlogs: Number.parseInt(data?.totalBlogs) + 1 };
            const resp = await authorModel.findOneAndUpdate({ name: req?.body?.name },
                newResp,
                { new: true }
            );
            SuccessResponse(res, { name: data?.name, totalBlogs: resp?.totalBlogs }, "Author saved");
        }
    } catch (error) {
        ErrorResponse(res, error, "Some error in saving author to db");
    }
}

exports.saveNewBlog = async (req, res) => {
    try {
        if (req?.body?.authorName.length === 0) {
            const data = { ...req?.body, authorName: "RPS" };
            const resp = await blogModel.create(data);
            SuccessResponse(res, { blogTitle: data?.blogTitle }, 'Blog created successfully.');
            return;
        } else {
            const data = await blogModel.create(req?.body);
            SuccessResponse(res, { blogTitle: data?.blogTitle }, 'Blog created successfully.');
            return;
        }
    } catch (error) {
        ErrorResponse(res, { error: error?.message }, 'Some error occurred while creating.');
    }
}

exports.getPostById = async (req, res) => {
    const _id = ObjectId(req?.params?.articleId);
    try{
        const post = await blogModel.findById(_id);
        if(post?.authorName?.length > 0){
            SuccessResponse(res,post,'Post fetched successfully.');
        }else{
            SuccessResponse(res,{...post,authorName:"RPS"},'Post fetched successfully.');
        }
    }catch(error){
        ErrorResponse(res,error?.message,'Post not found.');
    }
}

exports.postComment = async(req,res) => {
    const postId = req?.params.postId;
    try{
        const data = await commentModel.create(req?.body);
        SuccessResponse(res,data,'Comment added.');
    }catch(error){
        ErrorResponse(res,error?.message,'some error in adding comment');
    }
}

exports.getCommentsByPostId = async(req,res) => {
    const postId = req?.params?.postId;
    try{
        const comments = await commentModel.find({postId:postId});
        SuccessResponse(res,comments,'Comments fetched successfully.');
    }catch(error){
        ErrorResponse(res,error?.message,'Comments not found');
    }
}

exports.getAllAuthors = async(req,res) => {
    try{
        const authors = await authorModel.find({});
        SuccessResponse(res,authors,'Authors fetched successfully.');
    }catch(error){
        ErrorResponse(res,error?.message,'Authors not found.');
    }
}

exports.saveContact = async(req,res) => {
    try{
        const resp = await contactModel.create(req?.body);
        SuccessResponse(res,resp,'Your message has been sent,Our team will get in touch with you soon.')
    }catch(error){
        ErrorResponse(res,error?.message,'Some error has occured. Please try again');
    }
}
