var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('get user route was invoked');
  res.send('route is working, GPN is coming along!');
});

router.post('/addUser', async(req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserToAdd = new User({firstName, lastName, email, "password": hashedPassword});
    await newUserToAdd.save();
    console.log(newUserToAdd, `added a new user to DB`);
    res.status(201).json(newUserToAdd);
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
})

module.exports = router;
