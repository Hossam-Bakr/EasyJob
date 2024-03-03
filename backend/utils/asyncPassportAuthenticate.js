const passport = require('passport');

exports.asyncPassportAuthenticate = (strategy, req, res) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(strategy, (err, user, info) => {
        if (err) {
          reject(err);
        } else {
          resolve({ user, info });
        }
      })(req, res);
    });
  }
  