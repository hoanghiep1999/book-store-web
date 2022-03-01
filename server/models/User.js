const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passWord: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;