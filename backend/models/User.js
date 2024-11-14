// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure each username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email is unique
  },
  password: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model('User', userSchema);
