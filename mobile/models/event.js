import React from 'react-native';
import store from 'react-native-simple-store';
import config from './config.js';
var sms = React.NativeModules.SmsModule;

const url = `${config.apiHost}${config.apiExtension}events`;

function sendInvites(evt) {
  return new Promise((resolve, reject) => {
    evt.guests.forEach((guest, i) => {
      const message = `I\'m inviting you to my event, ${evt.title}.
        Please RSVP: ${config.webAppHost}${evt._id}/${evt.invites[i]}`
      sms.send(
        guest.phoneNumber,
        // '6038010474',
        message,
        console.log.bind(console),
        console.log.bind(console)
      );
    })
    resolve(evt);
    reject('invites not sent');
  });
};

function validate(event) {
  if (!event.guests || !event.guests.length) {
    return {event, error: 'the event must have at least one guest'};
  } else if (event.guests.filter(g => {return !g.phoneNumber}).length) {
    return {event, error: 'some guests did not have phone numbers'};
  } else if (!event.title) {
    return {event, error: 'the event must have a title'};
  } else if (!event.startDate || event.startDate < new Date()) {
    return {event, error: 'the event must have a valid start date'};
  } else if (!event.endDate || event.endDate < event.startDate) {
    return {event, error: 'the event must have a valid end date'};
  } else {
    return {event: event}
  }
};

module.exports = {
  create: function(evt) {
    const val = validate(evt);
    return new Promise((resolve, reject) => {
      if (val.error) reject(val.error);
      store.get('sessionToken')
      .then(token => {
        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(evt)
        })
        .then(evt => evt.json())
        .then(sendInvites)
        .then(resolve)
        .catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }
}
