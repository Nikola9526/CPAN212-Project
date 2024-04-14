const mongoose = require('mongoose');


//Create Schema
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phonenum: String,
    username:String,
    password: String, 
});

const User = mongoose.model('User', userSchema );
module.exports = User;
