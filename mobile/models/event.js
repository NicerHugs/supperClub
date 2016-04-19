import store from 'react-native-simple-store';

const url = 'http://192.168.0.3:3000/events';

module.exports = {
  create: function(evt) {
    return new Promise((resolve, reject) => {
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
      }
    }).catch(err => reject(err));
  });
}
