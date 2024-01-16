var express = require('express');
var router = express.Router();
const Post = require('../models/Post');
const { verifyToken } = require('../middleware/verifyToken');

/* -------------------------------
---------Get all Posts------------
------------------------------- */
router.get('/', verifyToken, async(req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
