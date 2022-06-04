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

    // var params = req.params;
    // return Session.find({ session_code: params.session_id })

    return Session.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log('error GET session.group_cart data')
        res.send(null);
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
        console.log('error PUT more item to user cart')
        res.send(null);
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
        console.log('error DELETE one item from user cart')
        res.send(null);
      })
  },

  updateUserPay: (req, res) => {
    let session_id = req.params.session_id
    let user_id = req.params.user_id

    return Session.updateOne(
      {session_code: session_id},
      {$set:{[`users.${user_id}.checkout?`]: true}}
    )
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('error PUT pay sessions');
      res.send(null);
    })
  },

  updateReceipt: (req, res) => {
    // console.log('param?', req.params);
    // console.log('body?', req.body);
    let session_id = req.params.session_id
    let user_id = req.params.user_id
    let user_cart = req.body.usercart
    let user_tip = req.body.usertip
    let user_paid = req.body.userpaid
    let receipt = {
      'user_id': user_id,
      'items': user_cart,
      'user_tip': user_tip,
      'total_paid': user_paid
    };
    // return Session.updateOne(
    //   {session_code: session_id},
    //   {$set:{[`receipt.${user_id}`]: receipt}}
    // )
    // .then((result) => {
    //   res.send(result);
    // })
    // .catch((error) => {
    //   console.log('error PUT pay sessions');
    //   res.send(null);
    // })
  },
}