var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Post = require('./models/Post');
const { verifyToken } = require('./middleware/verifyToken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var postsRouter = require('./routes/posts');

dotenv.config();
var app = express();
app.use(logger('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* -------------------------------
--------Multer diskstorage--------
------------------------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage })

/* -------------------------------
--Register a new user with photo--
------------------------------- */
app.post('/register', upload.single('pictureFile'), async (req, res) => {
  try {
    const {firstName, lastName, email, password, pictureUrl, location} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    /* const friends = [
      '65a0f73f8e3d4e2b52f0732e',
      '65a00a09b638a4ba32bd6a6d',
      '659fd28b456ee57e578f94a1'
    ] */
    const newUserToAdd = new User({firstName, lastName, email, "password": hashedPassword, pictureUrl, location, /* friends */});
    await newUserToAdd.save();
    console.log(newUserToAdd, `added a new user to DB`);
    res.status(201).json(newUserToAdd);
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
});

/* -------------------------------
---Create a new Post with photo---
------------------------------- */
app.post('/posts', verifyToken, upload.single('pictureFile'), async (req, res) => {
  try {
    const { userId, content, contentPictureUrl } = req.body;
    const user = await User.findById(userId);
    const post = new Post({
      userId, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      location: user.location, 
      userPictureUrl: user.pictureUrl, 
      content, 
      contentPictureUrl, 
      likes: {}, 
      comments: []
    });

    await post.save();

    const newFeed = await Post.find();
    res.status(201).json(newFeed);
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/posts', postsRouter);

async function init() {
  try {
      await mongoose.connect(process.env.MONGO_URL)
      .then(console.log('Connected to GreenPatchNetwork database'));
  } catch (error) {
      console.log(error);
  }
}

init()

module.exports = app;
