const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
});

module.exports = mongoose.model('users', userSchema);
