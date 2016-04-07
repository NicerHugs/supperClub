var express = require('express');
var errorhandler = require('errorhandler');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    ('OPTIONS' == req.method) ? res.send(200) : next();
};

var app = express();

app.use(allowCrossDomain);

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use(errorhandler());
}

db.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    http.createServer(app).listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
    });
  }
})