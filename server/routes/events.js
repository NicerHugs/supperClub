var uuid = require('uuid');
var ObjectId = require('mongodb').ObjectID;

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
      guests: req.body.guests,
			guestCap: req.body.guestCap
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
  },
  getById: function(req, res, next) {
    req.events.findOne({"_id" : req.params.eventId})
    .then( evt => res.json({
          title: evt.title,
          owner: evt.owner,
          startDate: evt.startDate,
          endDate: evt.endDate,
          descriptions: evt.description,
        }))
    .catch( err => req.status(500).end());

  },
  edit: function(req, res, next) {
    res.end();
  },
  getForRSVP: function(req, res, next) {
    req.events.findOne({"_id" : ObjectId(req.params.eventId)})
    .then( evt => {
      if (!evt) res.status(404).end();
      if (evt.invites.indexOf(req.params.token) > -1) {
        // user has a token to this event
        res.json({
          title: evt.title,
          owner: evt.owner,
          startDate: evt.startDate,
          endDate: evt.endDate,
          descriptions: evt.description,
          attending: evt.attendees.indexOf(req.params.token) > -1,
          full: evt.attendees.length === evt.guestCap
        })
      } else {
        res.status(404).end();
      }
    })
    .catch( err => res.status(500).end());

  },
  updateAttendees: function(req, res, next) {
    var verb = {};
    verb[req.body.response ? "$push" : "$pull"] = {
      attendees: req.params.token,
    };
    req.events.update({"_id" : ObjectId(req.params.eventId)}, {
      verb,
      $currentDate: { lastModified: true }
    })
    .then(() => {
      res.json({
        title: evt.title,
        owner: evt.owner,
        startDate: evt.startDate,
        endDate: evt.endDate,
        descriptions: evt.description,
        attending: evt.attendees.indexOf(req.params.token) > -1,
        full: evt.attendees.length === evt.guestCap
      })
    })
    .catch( err => res.status(500).end());
    res.json({attending: req.body.response});
  }
};
