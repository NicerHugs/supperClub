module.exports = {
  get: function(req, res, next) {
    //get all events for authenticated user
    res.json({events: [{title: 'event!'}]});
  },
  post: function(req, res, next) {
    // create a new event for authenticated user
    res.json({title: 'new event'});
  }
};
