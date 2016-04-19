var db = require('../db.js');

module.exports = function(req, res, next) {
  sessions = db.get().collection('sessions');
  sessions.findOne({"_id" : req.get('Authorization')})
  .then( session => {
    req.userId = session.user;
    next();
  }).catch( err => {
    res.status(403).end()})
}
