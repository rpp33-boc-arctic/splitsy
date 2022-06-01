const { User, Session } = require('../../../database');

module.exports = {
  orderStatus: (req, res) => {

  },

  getSessionUsers: (req, res) => {
    // /session:session_id/users
    var params = req.params;
    console.log('params', params);

    return Session.find({session_code: params.session_id}, 'users')
      .then((result) => {
        console.log('result', result)
        res.send(result);
      })
      .catch((error) => {
        console.log('error GET session.users data')
        res.send(null);
      })
  },

  getSessionGroupCart: (req, res) => {
    // /session:session_id/group_cart
    var params = req.params;
    console.log('params', params);

    return Session.find({ session_code: params.session_id }, 'group_cart')
      .then((result) => {
        console.log('result', result)
        res.send(result);
      })
      .catch((error) => {
        console.log('error GET session.group_cart data')
        res.send(null);
      })
  },

  updateUserCart: (req, res) => {
    // /session:session_id/user:user_id/cart
    var params = req.params;
    var order_item_id_to_update = 25; //req.body.order_item_id
    console.log('params', params);
    console.log('order_item_id_to_update', order_item_id_to_update);

    return Session.find({ session_code: params.session_id }, 'users') // CONTUNUE HERE
      .then((result) => {
        console.log('result', result[0].users[params.user_id])
        result[0].users[params.user_id].user_cart.push(order_item_id_to_update);
        console.log('result after push', result[0].users[params.user_id]);
        Session.update({ session_code: params.session_id }, {users: result});
        res.send(result);
      })
      .catch((error) => {
        console.log('error PUT session.users[userId].user_cart.push() data')
        res.send(null);
      })

  }
}