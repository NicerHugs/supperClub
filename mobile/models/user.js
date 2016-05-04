import store from 'react-native-simple-store';
import config from './config.js';

const url = `${config.apiHost}${config.apiExtension}user`;

const User = function() {
  this.create = function() {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };

  this.getBySessionToken = function(token) {
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
  };

  this.fetch = function() {
    return new Promise( (resolve, reject) => {
      store.get('sessionToken')
      .then(sessionToken => {
        if (sessionToken) {
          // use session token to get user and resolve with user
          this.getBySessionToken(sessionToken)
          .then(user => user.json())
          .then(userJSON => resolve(userJSON))
          .catch(err => {
            this.create()
            .then(response => response.text())
            .then(responseText => {
              const obj = JSON.parse(responseText);
              store.save('sessionToken', obj.sessionToken)
              .then((e) => {if (e) reject(e); else store.save('user', obj.user)})
              .then((e) => {if (e) reject(e); else resolve(obj.user)})
            })
            .catch((error) => {
              reject(error);
            });
          });
        } else {
          this.create()
          .then(response => response.text())
          .then(responseText => {
            const obj = JSON.parse(responseText);
            store.save('sessionToken', obj.sessionToken)
            .then((e) => {if (e) reject(e); else store.save('user', obj.user)})
            .then((e) => {if (e) reject(e); else resolve(obj.user)})
          })
          .catch((error) => {
            reject(error);
          });
        }
      });
    })
  }
}

export default new User();
