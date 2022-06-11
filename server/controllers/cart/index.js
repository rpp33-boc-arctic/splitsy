const { Session } = require('../../../database');

module.exports = {
  // order: (req, res) => {

  // }

  updateCart: (req, res) => {
    // var cart = req.body.cart;
    // var totalTax = req.body.totalTax;
    // var grandTotal = req.body.grandTotal;
    // var session_id = req.params.session_id;
    function convertLetterToNumber(str) {
      if ((typeof str === "string" || str instanceof String) && /^[a-zA-Z]+$/.test(str)) {
        str = str.toUpperCase();
        let out = 0,
          len = str.length;
        for (pos = 0; pos < len; pos++) {
          out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return out;
      } else {
        return 0;
      }
    }

    var cart = req.body.cart;
    console.log('cart in index.js cart: ', cart);

    var group_cart_obj = {};

    cart.forEach((item, index) => {
      var currentItem = {
        'order_item_id': index,
        'menu_item_id': convertLetterToNumber(item.product_id),
        'menu_item_name': item.name,
        'menu_item_description': item.description,
        'menu_item_photo': item.image,
        'menu_item_price': item.price,
        'user_id': '',
        'paid?': false
      }
      group_cart_obj[index] = currentItem;
      console.log('menu_item_id is: ', convertLetterToNumber(item.product_id));
    })

    // for (var i = 9; i < cart.length; i++) {
    //   var currentItem = {
    //     'order_item_id': i,
    //     'menu_item_id': convertletterToNumber(cart[i].product_id),
    //     'menu_item_name': cart[i].name,
    //     'menu_item_description': cart[i].description,
    //     'menu_item_photo': cart[i].image,
    //     'menu_item_price': cart[i].price,
    //     'user_id': req.jwtObject.owner,
    //     'paid?': false``
    //   }
    //   group_cart_obj.order_item_id = currentItem
    //   console.log('currentItem in group_cart_obj is: ', currentItem);
    // }

    console.log('group_cart_obj is: ', group_cart_obj);

    // var updatedCart = req.body.cart.map(item =>
    //    {return {
    //   product_id: item.name,
    //   description: item.description,
    //   photo: item.image,
    //   price: item.price,
    //   name: item.name,
    //   username: req.jwtObject.owner,
    //   paid: false
    //    }
    // }
    //   )

    // var group_cart = 'group_cart.' += ;
    // console.log('group_cart is: ', group_cart);
    // Person.update({'items.id': 2}, {'$set':  {'items.$': update}}, function(err) { ...
    // var group_cart = 'group_cart.' + req.jwtObject.owner;

    // Function needs to be fixed to update group_cart correctly

    // return Session.updateOne({ _id: req.jwtObject.session_id },  {'$set': {[group_cart] :updatedCart}});


    // COOKIE
    // res.status(200)
    //     .cookie('sessionCode',
    //       { 'session_code': <actual-session-code>, 'session_id': <actual-session-id> },
    //       { sameSite: true }
    //     );

    //======================================== Need jwtObject to exist =============

  //   console.log('jwtObject is: ', req.jwtObject);
  //   if (req.jwtObject) {
  //     // Session.updateOne({ _id: req.jwtObject.session_id },  {group_cart : group_cart_obj})
  //     Session.updateOne({ session_code: 'Session.estimatedDocumentCount()1' },  {group_cart : group_cart_obj})
  //     // ^^ this would overdrive other ppl's items
  //   .then((result) => {
  //     res.status(200).send('POST cart request received!');
  //   })
  //   .catch((error) => {
  //     console.log('error ADDING one item from user cart, error is: ', error);
  //     res.status(500).send(error);
  //   })
  // } else {
  //   // redirect to client page and send back error code
  //   res.status(500).send('error: failed to update cart, jwt token invalid');
  //   console.log('failed to update cart!');
  // }

  //=================================
  //   var payload = {
  //     session_id: session._id,
  //     owner: session.owner,
  //     code: session.order_code,
  //     address: session.restaurant.address,
  //     restaurant_id: session.restaurant_id
  // };

      // update cart and database

      // if req.jwtObject exists, then session_id exists
      // Session.updateOne({ _id: req.jwtObject.session_id }, { $set: { [group_cart]: req.body.cart } })
      // use updateOne to update databse with req.jwtObject.session_id
      // and req.body.cart, also req.body.totalTax and req.body.grandTotal
      // send back group_cart (set up timer on client side to update server every 2 sec)

      Session.updateOne({ session_code: 'Session.estimatedDocumentCount()1' },  {group_cart : group_cart_obj})
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
    // var cart = req.body.cart;
    // var totalTax = req.body.totalTax;
    // var grandTotal = req.body.grandTotal;
    // var session_id = req.params.session_id;

    // return Session.updateOne({ session_code: session_id }, { $set: { total_tax: totalTax, grand_total: grandTotal } })
    //   .then((result) => {
    //     console.log('GET cart server success! Cart is: ', result);
    //     res.status(200).send('POST summary request received!');
    //   })
    //   .catch((error) => {
    //     console.log('error updating summary data, error is: ', error);
    //     res.status(500).send(error);
    //   })
  }
}