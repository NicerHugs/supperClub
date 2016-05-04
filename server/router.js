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
  .all(authorize, function(req, res, next) {
    req.users = db.get().collection('users');
    req.events = db.get().collection('events');
    next();
  })
  .get(events.get)
  .post(events.post);

router.route('/events/:eventId')
  .all(authorize, function(req, res, next) {
    req.users = db.get().collection('users');
    req.events = db.get().collection('events');
    next();
  })
  .get(events.getById)
  .put(events.edit);

router.route('/:eventId/:token')
  .all(function(req, res, next) {
    req.events = db.get().collection('events');
    next();
  })
  .get(events.getForRSVP)
  .put(events.updateAttendees);

module.exports = router;
