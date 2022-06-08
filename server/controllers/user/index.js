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
    console.log('/user/history server route hit!');
    return Session.find({ session_code: 1 })
      .then((allOrders) => {
        var results = [];
        allOrders.forEach((singleOrder) => {
          if ((singleOrder.receipt) && singleOrder.receipt.get(req.params.user_id)) {
            var translatedItems = [];
            singleOrder.receipt.get(req.params.user_id).items.forEach((item) => {
              if (singleOrder.group_cart.get(JSON.stringify(item))) {
                translatedItems.push({
                  name: singleOrder.group_cart.get(JSON.stringify(item)).menu_item_name,
                  price: singleOrder.group_cart.get(JSON.stringify(item)).menu_item_price
                });
              }
            })
            console.log('translatedItems: ', translatedItems);
            results.push({
              restaurant: singleOrder.restaurant.name,
              items: translatedItems,
              tip: singleOrder.receipt.get(req.params.user_id).user_tip,
              total: singleOrder.receipt.get(req.params.user_id).total_paid
            })
          }
        })
        res.send(results);
      })
      .catch((error) => {
        console.log('/user/history database Session.find error', error);
        res.send(null);
      })
  },
  friends: (req, res) => {
    console.log('/user/friends server route hit!');
    return User.find({})
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log('/user/friends database User.find error', error);
        res.send(null);
      })
  }
}