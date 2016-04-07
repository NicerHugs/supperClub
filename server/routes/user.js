var uuid = require('uuid');

module.exports = {
  get: function(req, res, next) {
    // get the user in the users table
    // return the user in repsonse as json
    res.send('hi');
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
