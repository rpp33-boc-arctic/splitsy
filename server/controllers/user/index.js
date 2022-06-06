const { User, Session } = require('../../../database');

module.exports = {
  profile: (req, res) => {
    console.log('/user/profile server route hit!');
    return User.find({})
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log('/user/profile database User.find error', error);
        res.send(null);
      })
  },
  history: (req, res) => {
    console.log('/user/history server route hit!');
    return Session.find({ user_id: params.user_id })
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log('/user/history database Session.find error', error);
        res.send(null);
      })
  },
  friend: (req, res) => {}
}