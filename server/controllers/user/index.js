const { User, Session } = require('../../../database');

module.exports = {
  profile: (req, res) => {
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
    return Session.find({})
      .then((allOrders) => {
        var results = [];
        allOrders.forEach((singleOrder) => {
          if ((singleOrder.receipt) && singleOrder.receipt.get(req.params.user_id)) {
            var translatedItems = [];
            var translatedDate = new Date(parseInt(singleOrder.date)).toLocaleString('en-GB', { timeZone: 'UTC' }).split('');
            var x = translatedDate[0];
            var y = translatedDate[1];
            translatedDate[0] = translatedDate[3];
            translatedDate[1] = translatedDate[4];
            translatedDate[3] = x;
            translatedDate[4] = y;
            translatedDate.join('');
            singleOrder.receipt.get(req.params.user_id).items.forEach((item) => {
              if (singleOrder.group_cart.get(JSON.stringify(item))) {
                translatedItems.push({
                  name: singleOrder.group_cart.get(JSON.stringify(item)).menu_item_name,
                  price: singleOrder.group_cart.get(JSON.stringify(item)).menu_item_price
                });
              }
            })
            results.push({
              restaurant: singleOrder.restaurant.name,
              items: translatedItems,
              tip: singleOrder.receipt.get(req.params.user_id).user_tip,
              total: singleOrder.receipt.get(req.params.user_id).total_paid,
              date: translatedDate.slice(0, 10)
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