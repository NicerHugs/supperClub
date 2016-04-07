var express = require('express');
var router = express.Router();
var db = require('./db.js');

var user = require('./routes/user.js');

router.route('/user')
  .all(function(req, res, next) {
    req.users = db.get().collection('users');
    req.sessions = db.get().collection('sessions');
    next();
  })
  .get(user.get)
  .post(user.post);

module.exports = router;
