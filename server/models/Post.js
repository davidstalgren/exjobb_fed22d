const { mongoose } = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 30
    },
    location: String,
    userPictureUrl: String,
    content: String,
    contentPictureUrl: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: []
    }
  }
);

module.exports = mongoose.model('Post', PostSchema);
