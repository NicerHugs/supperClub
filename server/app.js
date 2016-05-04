var http = require('http');
var express = require('express');
var errorhandler = require('errorhandler');
var db = require('./db.js');
var bodyParser = require('body-parser');
var router = require('./router.js');
var path = require('path');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    ('OPTIONS' == req.method) ? res.send(200) : next();
};

var app = express();

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.use('/api/v1', router);
app.use('/', express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'index.html'))})

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
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
