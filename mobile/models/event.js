import store from 'react-native-simple-store';

const url = 'http://192.168.0.3:3000/events';

module.exports = {
  validate: function(event) {
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
  },
  create: function(evt) {
    var validate = this.validate(evt);
    return new Promise((resolve, reject) => {
      if (validate.error) reject(validate.error);
      store.get('sessionToken')
      .then(token => {
        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
          }})
        .then(evt => evt.text())
        .then(evtText => resolve(JSON.parse(evtText)))
        .catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }
}
