const { Session } = require('../../../database');

module.exports = {
  updateCart: (req, res) => {
    var transformID = (str) => {
      var result = 0;
      var pureStr = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
      for (var i = 0; i < pureStr.length; i++) {
        var currentCharCode = pureStr.charCodeAt(i);
        result += currentCharCode;
      }
      return result;
    }

    var cart = req.body.cart;
    var group_cart_obj = {};
    var totalTax = 0;
    var grandTotal = 0;
    var totalOwed = 0;

    cart.forEach((item, index) => {
      var currentItem = {
        'order_item_id': index,
        'menu_item_id': transformID(item.product_id),
        'menu_item_name': item.name,
        'menu_item_description': item.description,
        'menu_item_photo': item.image,
        'menu_item_price': item.price,
        'user_id': '',
        'paid?': false
      }
      group_cart_obj[index] = currentItem;
      grandTotal += parseInt(currentItem.menu_item_price);
      console.log('menu_item_id is: ', transformID(item.product_id));
    })

    totalTax = Math.round((grandTotal * 7.25) / 100);
    totalOwed = totalTax + grandTotal;

    Session.updateOne({ session_code: '33' }, { group_cart: group_cart_obj, total_tax: totalTax, grand_total: grandTotal, total_owed: totalOwed })
      .then((result) => {
        res.status(200).send('POST cart request received!');
      })
      .catch((error) => {
        console.log('error ADDING one item from user cart, error is: ', error);
        res.status(500).send(error);
      })

  },

  // getCart is unused right now.
  getCart: (req, res) => {
    var params = req.params;
    return Session.find({ session_code: params.session_id })
      .then((result) => {
        console.log('GET cart server success! Cart is: ', result);
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log('error GET session.group_cart data')
        res.status(500).send(error);
      })
  },

  updateSummary: (req, res) => {
    // update summary logic here. Unused right now.
  }
}