const { User, Session } = require('../../../database');

module.exports = {
  // order: (req, res) => {

  // }

  updateCart: (req, res) => {

  },
  getCart: (req, res) => {
    var params = req.params;

    return Session.find({ session_code: params.session_id })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log('error GET session.group_cart data')
        res.send(null);
      })
  }
}