const { User, Session } = require('../../../database');

module.exports = {
  getUserInfo: (req, res) => {
    var params = req.params;
    // console.log('param?', req.params);
    return Session.find({session_code: params.session_id}, 'users')
      .then((result) => {
        let users = result[0].users;
        // res.send([...users.keys()]);
        return [...users.keys()];
      })
      .then((currentUsers) => {
        // return User.find({}).where('user_id').in(currentUsers)
        return User.find({
          'user_id':{$in: currentUsers}
        })
      })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log('error GET session user info');
        res.send(null);
      })
  },

  getSessionUsers: (req, res) => {
    // /session:session_id/users
    var params = req.params;

    return Session.find({session_code: params.session_id}, 'users')
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log('error GET session.users data')
        res.send(null);
      })
  },

  getSession: (req, res) => {
    // /session:session_id
    var params = req.params;

    return Session.find({ session_code: params.session_id })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      })
  },

  updateUserCart: (req, res) => {
    // /session:session_id/user:user_id/cart
    var session_id = req.params.session_id;
    var order_item_id_to_update = req.body.order_item_id;
    var user_id = req.params.user_id;

    return Session.updateOne({ session_code: session_id }, { $addToSet: {[`users.${user_id}.user_cart`]: order_item_id_to_update}}, {upsert: true }) // CONTUNUE HERE
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      })
  },

  removeOneFromUserCart: (req, res) => {
    // /session:session_id/user:user_id/cart
    var session_id = req.params.session_id;
    var order_item_id_to_remove = req.body.order_item_id;
    var user_id = req.params.user_id;

    return Session.updateOne({ session_code: session_id }, { $pull: {[`users.${user_id}.user_cart`]: order_item_id_to_remove}}) // CONTUNUE HERE
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      })
  },

  updateUserPay: (req, res) => {
    let session_id = req.params.session_id
    let user_id = req.params.user_id

    return Session.updateOne(
      {session_code: session_id},
      {$set:{[`users.${user_id}.checkout?`]: true}},
      {upsert: true}
    )
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('error PUT update user paid');
      res.send(null);
    })
  },

  updateItemPay: (req, res) => {
    ///session:session_id/user:user_id/item_paid
    let session_id = req.params.session_id;
    let user_id = req.params.user_id;

    var updateItemPaid = (order_item_id) => {
      Session.updateOne(
        {session_code: session_id},
        {$set:{[`group_cart.${order_item_id}.paid?`]: true}},
        {upsert: true}
      )
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        })
    }

    return Session.findOne({session_code: session_id}, 'users')
      .then((users) => {
        var orders = users.users.get(user_id).user_cart;
        orders.forEach(async (order_item_id) => {
          await updateItemPaid(order_item_id);
        })
        return user_id;
      })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log('error PUT update an item paid', error);
        res.send(error);
      })
  },

  updateReceipt: (req, res) => {
    // console.log('param?', req.params);
    // console.log('body?', req.body);
    let session_id = req.params.session_id
    let user_id = req.params.user_id
    let user_cart = req.body.userCart
    let user_tip = req.body.userTip
    let user_paid = req.body.userTotal

    Session.find({session_code: session_id})
    .then((session) => {
      // console.log('session', session[0].receipt.get(user_id));
      return session[0].receipt.get(user_id)
    }).then((oldReceipt) => {
      if (oldReceipt) {
        var receipt = {
          'user_id': user_id,
          'items': oldReceipt.items.concat(user_cart),
          'user_tip': oldReceipt.user_tip + user_tip,
          'total_paid': oldReceipt.total_paid + user_paid
        };
      } else {
        var receipt = {
          'user_id': user_id,
          'items': user_cart,
          'user_tip': user_tip,
          'total_paid': user_paid
        };
      }
      return receipt;
    }).then((receipt) => {
      return Session.updateOne(
        {session_code: session_id},
        {$set:{[`receipt.${user_id}`]: receipt}},
        {upsert: true}
      )
    }).then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('error PUT update receipt');
      res.send(null);
    })
  },

  updateOrderPaid: (req, res) => {
    let session_id = req.params.session_id;
    return Session.updateOne(
      {session_code: session_id},
      {$set:{'order_paid?': true}},
      {upsert: true}
    )
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('error PUT update order paid');
      res.send(null);
    })
  },

  updateTotalTipAndTotalPaid: (req, res) => {
    let session_id = req.params.session_id;
    let update_tip = req.body.update_tip;
    let update_total_paid = req.body.update_total_paid;

    return Session.updateOne(
      {session_code: session_id},
      {$set:{
        'total_tip': update_tip,
        'total_paid': update_total_paid
      }},
      {upsert: true}
    )
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('error PUT update total tip and paid');
      res.send(null);
    })
  }
}