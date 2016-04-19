import store from 'react-native-simple-store';

const url = 'http://192.168.0.3:3000/events';

module.exports = {
  create: function(evt) {
    console.log(evt);
  }
}
