const { User, Session } = require('../../../database');

module.exports = {
  // order: (req, res) => {

  // }

  updateCart: (req, res) => {
    // /session:session_id/user:user_id/cart
    // var order_item_id_to_update = req.body.order_item_id;
    // var user_id = req.params.user_id;
    var cart = req.body.cart;
    var totalTax = req.body.totalTax;
    var grandTotal = req.body.grandTotal;
    var session_id = req.params.session_id;
    // var order_item_id = req.body.order_item_id
    // console.log('req.params.session_id is: ', session_id);

    for (var i = 0; i < cart.length; i++) {
      var currentItem = {
        order_item_id: order_item_id,
        menu_item_name: cart[i].name,
        menu_item_description: cart[i].description,
        menu_item_photo: cart[i].image,
        menu_item_price: cart[i].price,
        // user_id: cart[i].description,
        // paid?: cart[i].paid
      }
    }

    console.log('session_id is: ', session_id);
    var group_cart = 'group_cart.' + JSON.stringify(order_item_id);
    console.log('group_cart is: ', group_cart);

    return Session.updateOne({ session_code: session_id }, { $set: {[group_cart]: currentItem}})
    .then((result) => {
      res.status(200).send('POST cart request received!');
    })
    .catch((error) => {
      console.log('error ADDING one item from user cart, error is: ', error);
      res.status(500).send(error);
    })

  },
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
  // deleteCart: (req, res ) => {
  //   // delete cart logic here
  // }

  updateSummary: (req, res) => {
    var cart = req.body.cart;
    var totalTax = req.body.totalTax;
    var grandTotal = req.body.grandTotal;
    var session_id = req.params.session_id;

    return Session.updateOne({ session_code: session_id }, { $set: {total_tax: totalTax, grand_total: grandTotal}})
    .then((result) => {
      console.log('GET cart server success! Cart is: ', result);
      res.status(200).send('POST summary request received!');
    })
    .catch((error) => {
      console.log('error updating summary data, error is: ', error);
        res.status(500).send(error);
    })
  }
}