const router = require('express').Router();
const authController = require('./controllers/authentication');
const userController = require('./controllers/user');
const cartController = require('./controllers/cart');
const restaurantController = require('./controllers/restaurant');
const SessionController = require('./controllers/Sessions');
const paymentController = require('./controllers/payment');
const seedController = require('./controllers/payment/seed.js');
const joinOrder = require('./controllers/joinOrder');

var isAuthenticated = (req, res, next) => {
  // console.log('req.cookies', req.cookies);
  // console.log('ver', authController.verifyUser(req.cookies));

  if (!authController.verifyUser(req.cookies.splitsy)) {
    res.send('Unauthorized');
  } else {
    next();
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
// router.get('/restaurant/menu', (req, res) => {});
router.get('/joinOrder',joinOrder.joinOrder);
router.get('/orderSession', SessionController.createSession);
router.get('/:restaurant/menu', (req, res) => { });




// Cart
router.get('/session/get_cart', cartController.getCart);
router.post('/session/update_cart', cartController.updateCart);
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


// Seed
// router.get('/seedUser', seedController.seedUser);
// router.get('/seedSession', seedController.seedSession);
// router.get('/testSeed', seedController.testSeed);
// router.get('/testSeed2', seedController.testSeed2);


module.exports = router;