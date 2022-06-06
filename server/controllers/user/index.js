const { User, Session } = require('../../../database');

module.exports = {
  profile: (req, res) => {
    console.log('/user/profile server route hit!');
    return User.find({ user_id: req.params.user_id })
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log('/user/profile database User.find error', error);
        res.send(null);
      })
  },
  history: (req, res) => {
    console.log('req.params.user_id: ', req.params.user_id);
    console.log('/user/history server route hit!');
    return Session.find({})
      .then((allOrders) => {
        var results = [];
        allOrders.forEach((singleOrder) => {
          console.log('individaul order data: ', singleOrder.receipt);
          for(var key in singleOrder.receipt) {
            if (key === req.params.user_id) {
              results.push({
                restaurant: singleOrder.restaurant.name,
                items: singleOrder.receipt[key].items,
                total: singleOrder.receipt[key].total_paid
              })
            }
          }
        })
        console.log('res.send results: ', results);
        res.send(results);
      })
      .catch((error) => {
        console.log('/user/history database Session.find error', error);
        res.send(null);
      })
  }
}