var uuid = require('uuid');

function buildInvites(guests) {
  return guests.map(guest => {
    return uuid.v4();
  });
}

module.exports = {
  get: function(req, res, next) {
    //get all events for authenticated user
    res.json({events: [{title: 'event!'}]});
  },
  post: function(req, res, next) {
    const evt = {
      title: req.body.title,
      invites: buildInvites(req.body.guests),
      owner: 'Jess Scheuring',
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      guests: req.body.guests
    };
    req.events.insertOne(evt, (err, result) => {
      if (err) res.status(500).end();
      req.users.findOne({_id: req.userId}, (err, user) => {
        req.users.update({_id: req.userId}, {
          $set: {events: user.events.concat([result.insertedId])}
        }, (err) => {
          if (err) res.status(500).end();
          res.json(Object.assign(evt, {_id: result.insertedId}))
        });
      });
    });
  }
};
