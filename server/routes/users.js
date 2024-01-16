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
});

/* -------------------------------
-------Add or Remove Friend-------
------------------------------- */
router.put('/:id/:friendId', verifyToken, async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friend = await User.findById(req.params.friendId);

    if (user.friends.includes(req.params.friendId)) {
      user.friends = user.friends.filter((id) => id !== req.params.friendId);
      friend.friends = friend.friends.filter((id) => id !== req.params.id);
    } else {
      user.friends.push(req.params.friendId);
      friend.friends.push(req.params.id);
    }
    await user.save();
    await friend.save();

    const updatedFriendsList = await Promise.all(
      user.friends.map((id) => User.findById(id).select('_id firstName lastName location pictureUrl'))
    );
    res.status(200).json(updatedFriendsList)
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
