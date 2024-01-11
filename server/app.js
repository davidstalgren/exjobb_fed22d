var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

dotenv.config();
var app = express();
app.use(logger('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage })

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
