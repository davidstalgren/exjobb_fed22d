var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/:id', verifyToken, async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
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

router.get('/:id/friends', verifyToken, async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if(user) {
      const friendsListFull = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );

      const friendsListMinified = friendsListFull.map(({_id, firstName, lastName, location, pictureUrl}) => {
        return {_id, firstName, lastName, location, pictureUrl}
      });
      res.status(200).json(friendsListMinified);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
})



module.exports = router;
