const { mongoose } = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: string,
      required: true,
      min: 2,
      max: 30
    },
    lastName: {
      type: string,
      required: true,
      min: 2,
      max: 30
    },
    email: {
      type: string,
      required: true,
      unique: true,
      min: 2,
      max: 50
    },
    password: {
      type: string,
      required: true,
      min: 8
    },
    pictureUrl: {
      type: string,
      default: ""
    },
    friends: {
      type: Array,
      default: []
    },
    location: string
  }
);

module.exports = mongoose.model('User', UserSchema);
