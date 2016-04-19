var uuid = require('uuid');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  get: function(req, res, next) {
    req.users.findOne({"_id" : req.userId})
    .then( user => res.json(user))
    .catch( err => req.status(500).end());
  },
  post: function(req, res, next) {
    // make a new uuid
    var id = uuid.v4();
    // create a new user in the database
    var user = {};
    req.users.insertOne(user, (err, result) => {
      if (err) res.status(500).end();
      var session = {
        _id: id,
        user: result.insertedId
      }
      // save a session to the database with uuid as key
      req.sessions.insertOne(session, (err, result2) => {
        if (err) res.status(500).end();
        // return session to user's device
        res.json({
          sessionToken: result2.insertedId,
          user: {_id: result.insertedId}
        });
      })
    });
  }
};
