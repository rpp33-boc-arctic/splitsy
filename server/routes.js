const router = require('express').Router();
const authController = require('./controllers/authentication');
const userController = require('./controllers/user');
const cartController = require('./controllers/cart');
const restaurantController = require('./controllers/restaurant');
const SessionController = require('./controllers/Sessions');
const paymentController = require('./controllers/payment');
const seedController = require('./controllers/payment/seed.js');
const joinOrder = require('./controllers/joinOrder');
var jwt = require('jsonwebtoken');


var isAuthenticated = (req, res, next) => {
  // console.log('req.cookies', req.cookies);
  // console.log('ver', authController.verifyUser(req.cookies));
  if (!authController.verifyUser(req.cookies.splitsy)) {
    res.send('Unauthorized');
  } else {
    next();
  }
}

var jwtMiddleware = function (req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('req.headers is; ', req.headers);
  console.log('authHeader is; ', authHeader);

  try {
    const token = authHeader.split(' ')[1];
    console.log('token inside middleware func is: ', token);
    req.jwtObject = jwt.verify(token, 'Server Password');
    console.log('req.jwtObject inside jwtMiddleware is: ', req.jwtObject);
    next()
  } catch (err) {
    console.log('jwt middleware error is: ', JSON.stringify(err).slice(0, 100));
    req.jwtObject = undefined;
    next()
  }
}

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// User profile
router.get('/user/profile:user_id', userController.profile);
router.get('/user/history:user_id', userController.history);
router.get('/user/friends', userController.friends);

// Restaurants
router.get('/restaurant', restaurantController.restaurantList);
router.get('/joinOrder',joinOrder.joinOrder);
router.get('/orderSession', SessionController.createSession);
router.get('/:restaurant/menu', (req, res) => { });

// Cart
router.get('/session/get_cart', cartController.getCart);
router.post('/session/update_cart', jwtMiddleware, cartController.updateCart);
router.post('/session/update_summary', cartController.updateSummary);

// Payment
router.get('/session:session_id/users', paymentController.getSessionUsers);
router.get('/session:session_id', paymentController.getSession);
router.put('/session:session_id/user:user_id/cart', paymentController.updateUserCart);
router.put('/session:session_id/user:user_id/item_paid', paymentController.updateItemPay);
router.delete('/session:session_id/user:user_id/cart', paymentController.removeOneFromUserCart);

router.get('/session:session_id/userInfo', paymentController.getUserInfo);
router.put('/session:session_id/user:user_id/pay', paymentController.updateUserPay);
router.put('/session:session_id/user:user_id/receipt', paymentController.updateReceipt);
router.put('/session:session_id/updateOrderPaid', paymentController.updateOrderPaid);
router.put('/session:session_id/updateTotalTipAndTotalPaid', paymentController.updateTotalTipAndTotalPaid);

module.exports = router;