const User = require('../../../database/index.js').User;

module.exports = {
  profile: (req, res) => {
    User.find({})
      .then((users) => {
        console.log('users', users);
        res.send(users);
      })
      .catch((err) => {
        console.log('error retriving users in user db', err);
        res.send(null);
      })
  }
}