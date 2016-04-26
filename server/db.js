var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/supperClub';

var state = {
  db: null
};

exports.connect = function(url, done) {
  if (state.db) return done();

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err);
    state.db = db;
    console.log("Connected correctly to server.");
    done();
  })
};

exports.get = function() {
  return state.db
};
