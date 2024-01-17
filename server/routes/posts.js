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

/* -------------------------------
---------Get User Posts------------
------------------------------- */
router.get('/:userId', verifyToken, async(req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
});

/* -------------------------------
------------Like Post-------------
------------------------------- */
router.put('/:postId/like', verifyToken, async(req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const likeStatus = post.likes.get(req.body.userId);

    if(likeStatus) {
      post.likes.delete(req.body.userId);
    } else {
      post.likes.set(req.body.userId, true);
    }
    await post.save();
    const newPostStatus = await Post.findById(req.params.postId);
    res.status(200).json(newPostStatus);

  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
