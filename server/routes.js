const router = require('express').Router();
const authController = require('./controllers/authentication');
const userController = require('./controllers/user');
const cartController = require('./controllers/cart');
const restaurantController = require('./controllers/restaurant');
const sessionController = require('./controllers/session');
const paymentController = require('./controllers/payment');
const seedController = require('./controllers/payment/seed.js');

var isAuthenticated = (req, res, next) => {
  // console.log('req.cookies', req.cookies);
  // console.log('ver', authController.verifyUser(req.cookies));

  if (!authController.verifyUser(req.cookies.splitsy)) {
    res.send('Unauthorized');
  } else {
    next();
  }
}
// SAMPLE USAGE
// router.get('/session:session_id', isAuthenticated, paymentController.getSession);


// Authentication
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


// User profile
router.get('/user/profile', userController.profile);
router.get('/user/history', userController.history);
router.get('/user/friend', userController.friends);


// Restaurants
router.get('/restaurant', restaurantController.restaurantList);
router.get('/:restaurant/menu', (req, res) => {});


// Session
router.post('/session:id', sessionController.createSession);


// Cart
router.post('/session:id/order', cartController.order);


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