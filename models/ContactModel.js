const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        strict: true
    }
);
const ContactModel = mongoose.model('ContactModel',ContactSchema,'ContactData');
module.exports = ContactModel;