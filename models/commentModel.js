const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  }
});

module.exports.commentModel = mongoose.model('Comment', commentSchema);
