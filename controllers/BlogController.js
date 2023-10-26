const contactModel = require('../models/ContactModel')
const blogPostModel = require('../models/BlogPostModel');
const { SuccessResponse, ErrorResponse } = require('../utils/Response');

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
