const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.get('/',() => {
    return JSON.stringify({message:"Hello world"});
})
module.exports = app;