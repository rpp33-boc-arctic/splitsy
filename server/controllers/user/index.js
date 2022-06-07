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
    return Session.find({})
      .then((allOrders) => {
        var results = [];
        allOrders.forEach((singleOrder) => {
          if (singleOrder.receipt.get(req.params.user_id)) {
            // var translatedItems = [];
            // singleOrder.receipt.get(req.params.user_id).items.forEach((item) => {
            //   console.log('item id: ', item);
            //   if(singleOrder.group_cart.get(item)) {
            //     console.log('found it in group cart!')
            //     // translatedItems.push(singleOrder.group_cart.get(item).menu_item_name);
            //   }
            // })
            results.push({
              restaurant: singleOrder.restaurant.name,
              items: singleOrder.receipt.get(req.params.user_id).items,
              total: singleOrder.receipt.get(req.params.user_id).total_paid
            })
          }
        })
        console.log('res.send results: ', results);
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