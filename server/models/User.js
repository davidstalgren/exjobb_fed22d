const { mongoose } = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 30
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50
    },
    password: {
      type: String,
      required: true,
      min: 8
    },
    pictureUrl: {
      type: String,
      default: ""
    },
    friends: {
      type: Array,
      default: []
    },
    location: String
  }
);

module.exports = mongoose.model('User', UserSchema);
