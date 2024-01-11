var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/', async(req, res) => {
  try {
    const userLoggingIn = await User.findOne({email: req.body.email})

    if(!userLoggingIn) {
      res.status(401).json({ message: 'Invalid email' })
    }
    const match = await bcrypt.compare(req.body.password, userLoggingIn.password);
    
    if(match) {
      res.status(200).json(userLoggingIn);
    } else {
      console.log(req.body.password);
      console.log(userLoggingIn.password);
      res.status(400).json({message: 'Wrong password'});
    }
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
})

module.exports = router;