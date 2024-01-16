var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { verifyToken } = require('../middleware/verifyToken');

/* -------------------------------
-------------Get User-------------
------------------------------- */
router.get('/:id', verifyToken, async(req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
});

/* -------------------------------
-------Get User Friendslist-------
------------------------------- */
router.get('/:id/friends', verifyToken, async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if(user) {
      const friendsList = await Promise.all(
        user.friends.map((id) => User.findById(id).select('_id firstName lastName location pictureUrl'))
      );
      res.status(200).json(friendsList);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
})

module.exports = router;
