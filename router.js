const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controllers/BlogController');
const { InvalidResponse } = require('./utils/Response');
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    res.json({message:"Hello"});
})
app.get('/getallblogs',controller.getAllBlogs);
app.post('/saveContactInfo',controller.saveContactData);

app.post('/register',controller.signup);

app.post('/login',controller.login);

app.post('/saveauthor',controller.saveAuthor);

app.post('/savenewblog',controller.saveNewBlog);

app.get('/article/:articleId',controller.getPostById);

app.post('/post/comment/save',controller.postComment)

app.get('/post/comment/retrieve/:postId',controller.getCommentsByPostId);

app.get('/allauthors',controller.getAllAuthors);


app.get('/*',(req,res) => {
    InvalidResponse(res);
})
app.post('/*',(req,res) => {
    InvalidResponse(res);
})

module.exports = app;