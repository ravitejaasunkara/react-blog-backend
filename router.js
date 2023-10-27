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
app.get('/getAllBlogs',controller.getAllBlogs);
app.post('/saveContactInfo',controller.saveContactData);

app.post('/register',controller.signup);

app.post('/login',controller.login);

app.get('/*',(req,res) => {
    InvalidResponse(res);
})
app.post('/*',(req,res) => {
    InvalidResponse(res);
})

module.exports = app;