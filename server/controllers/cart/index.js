const { OrderSession } = require('../../../database');

module.exports = {
  // order: (req, res) => {

  // }

  updateCart: (req, res) => {
    // var cart = req.body.cart;
    // var totalTax = req.body.totalTax;
    // var grandTotal = req.body.grandTotal;
    // var session_id = req.params.session_id;
    // for (var i = 0; i < cart.length; i++) {
    //   var currentItem = {
    //     order_item_id: order_item_id,
    //     menu_item_name: cart[i].name,
    //     menu_item_description: cart[i].description,
    //     menu_item_photo: cart[i].image,
    //     menu_item_price: cart[i].price,
    //   }
    // }

    var updatedCart = req.body.cart.map(item =>
       {return {
      product_id: item.name,
      description: item.description,
      photo: item.image,
      price: item.price,
      name: item.name,
      username: req.jwtObject.owner,
      paid: false
       }
    }
      )

    console.log('req.jwtObject is: ', req.jwtObject);
    // var group_cart = 'group_cart.' += ;
    // console.log('group_cart is: ', group_cart);
    // Person.update({'items.id': 2}, {'$set':  {'items.$': update}}, function(err) { ...
    var group_cart = 'group_cart.' + req.jwtObject.owner;

    // Function needs to be fixed to update group_cart correctly
    return OrderSession.updateOne({ _id: req.jwtObject.session_id },  {'$set': {[group_cart] :updatedCart}})
    // .then((result) => {
    //   res.status(200).send('POST cart request received!');
    // })
    // .catch((error) => {
    //   console.log('error ADDING one item from user cart, error is: ', error);
    //   res.status(500).send(error);
    // })

    if (req.jwtObject) {
      // update cart and database
      console.log('jwtObject is: ', req.jwtObject);
      // if req.jwtObject exists, then session_id exists
      OrderSession.updateOne({ _id: req.jwtObject.session_id }, { $set: { [group_cart]: req.body.cart } })
      // use updateOne to update databse with req.jwtObject.session_id
      // and req.body.cart, also req.body.totalTax and req.body.grandTotal
      // send back group_cart (set up timer on client side to update server every 2 sec)
    } else {
      // redirect to client page and send back error code
      res.status(500).send('error: failed to update cart, jwt token invalid');

    }

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

    return Session.updateOne({ session_code: session_id }, { $set: { total_tax: totalTax, grand_total: grandTotal } })
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