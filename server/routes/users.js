var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('get user route was invoked');
  res.send('route is working, GPN is coming along!');
});

module.exports = router;
