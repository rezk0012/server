const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  user_type: String,
  image: String,
  forgetPW: {
    type: Boolean,
    default: false
  }, 
  org: String
});

module.exports = mongoose.model('User', userSchema);
