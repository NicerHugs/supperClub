import store from 'react-native-simple-store';

const url = 'http://192.168.0.3:3000/user';

const User = function() {
  this.create = function() {
    console.log('creating user now');
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };

  this.getBySessionToken = function(token) {
    console.log('fetching user by token ' + token);
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
          .then(user => user.text())
          .then(userText => resolve(JSON.parse(userText)))
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
