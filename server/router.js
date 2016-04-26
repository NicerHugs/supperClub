var express = require('express');
var router = express.Router();
var db = require('./db.js');
var authorize = require('./routes/authorize');

var user = require('./routes/user.js');
var events = require('./routes/events.js');

router.route('/user')
  .all(function(req, res, next) {
    req.users = db.get().collection('users');
    req.sessions = db.get().collection('sessions');
    next();
  })
  .get(authorize, user.get)
  .post(user.post);

router.route('/events')
  .all(function(req, res, next) {
    req.users = db.get().collection('users');
    req.events = db.get().collection('events');
    next();
  })
  .get(authorize, events.get)
  .post(authorize, events.post);

module.exports = router;
