const mongoose = require('mongoose');
const conn = require('./Connection');
const { Schema } = mongoose;

const userModel = new Schema({
  username:  String, // String is shorthand for {type: String}
  email: String,
  password:   String,
});
const User = conn.model('User', userModel);
module.exports = User;