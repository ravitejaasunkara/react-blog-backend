const contactModel = require('../models/ContactModel')
const blogPostModel = require('../models/BlogPostModel');
const { SuccessResponse, ErrorResponse } = require('../utils/Response');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const authModel = require('../models/AuthModel');

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
        SuccessResponse(res, data);
    } else {
        ErrorResponse(res, data);
    }
}

exports.signup = async(req,res) => {
    const hashedPassword = await bcrypt.hash(req?.body?.password,saltRounds);
    const newData = {...req?.body,hashedPassword};
    const isUserExist = await authModel.find({email:req?.body?.email});
    if(isUserExist.length > 0){
        ErrorResponse(res,{username:isUserExist[0]?.displayName},"User already registered");
    }else{
        try{
            const user = await authModel.create(newData);
            console.log('User',user);
            SuccessResponse(res,{username:user?.displayName,email:user?.email},"Successfully registered")
        }catch(error){
            ErrorResponse(res,[],error?.message);
        }
    }
}

exports.login = async(req,res) => {
    const {email,password} = req?.body;
    const checkUserExist = await authModel.findOne({email:email});
    if(checkUserExist == null){
        ErrorResponse(res,{email:email},"User not found.");
        return;
    }
    if(!(await bcrypt.compare(password,checkUserExist?.hashedPassword))){
        ErrorResponse(res,{email:email},"Email or Password is wrong please check.");
        return;
    }
    SuccessResponse(res,{email:email,username:checkUserExist?.displayName},"Login successful.");
}
