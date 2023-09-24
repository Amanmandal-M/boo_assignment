const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0 
  }
});

module.exports.commentModel = mongoose.model('Comment', commentSchema);
