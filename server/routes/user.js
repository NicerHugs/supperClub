var uuid = require('uuid');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  get: function(req, res, next) {
    var token = req.get('Authorization');
    // get the session from the session collection
    var sessionCursor = req.sessions.find({"_id" : token});
    sessionCursor.hasNext().then((b) => {
      if (!b) {sessionCursor.close(); res.status(500).end();}
      sessionCursor.next().then(session => {
        // get the user from the user collection
        var userCursor = req.users.find({"_id" : session.user});
        userCursor.hasNext().then((b) => {
          if (!b) {sessionCursor.close(); userCursor.close(); res.status(500).end();}
          userCursor.next().then(user => {
            userCursor.close();
            sessionCursor.close();
            //send the user back as json
            res.json(user);
          });
        });
      });
    })
  },
  post: function(req, res, next) {
    // make a new uuid
    var id = uuid.v4();
    // create a new user in the database
    var user = {};
    req.users.insertOne(user, (err, result) => {
      var session = {
        _id: id,
        user: result.insertedId
      }
      // save a session to the database with uuid as key
      req.sessions.insertOne(session, (err, result) => {
        // return session to user's device
        res.json({sessionToken: result.insertedId});
      })
    });
  }
};
