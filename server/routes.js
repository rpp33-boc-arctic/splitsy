const router = require('express').Router();
const authController = require('./controllers/authentication');
const userController = require('./controllers/user');
const cartController = require('./controllers/cart');
const restaurantController = require('./controllers/restaurant');
const sessionController = require('./controllers/session');
const paymentController = require('./controllers/payment');

// Authentication
router.post('/register', authController.register);

router.post('/login', (req, res) => {
});


// User profile
router.get('/user', userController.profile);
router.post('/logout', (req, res) => {
});
router.get('/user/history', (req, res) => {
});
router.get('/user/friends', (req, res) => {
});


// Restaurants
router.get('/restaurant', restaurantController.restaurantList);
router.get('/:restaurant/menu', (req, res) => {
});


// Session
router.post('/session:id', sessionController.createSession);


// Cart
router.post('/session:id/order', cartController.order);


// Checkout
router.get('/orderStatus', paymentController.orderStatus);
router.post('/item:id/add', (req, res) => {
});

router.post('/item:id/delete', (req, res) => {
});

router.get('/user_id/cart', (req, res) => {
});

router.get('/pay', (req, res) => {
});



module.exports = router;