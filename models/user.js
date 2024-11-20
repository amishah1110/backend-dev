//for database schema

const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String, 
    email: String,
    password: String
})
 
const userModel = mongoose.model('user', userSchema); //parameters - model name and schema to be passed

module.exports = userModel