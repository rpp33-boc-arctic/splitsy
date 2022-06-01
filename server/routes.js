const router = require('express').Router();
const authController = require('./controllers/authentication');
const userController = require('./controllers/user');
const cartController = require('./controllers/cart');
const restaurantController = require('./controllers/restaurant');
const sessionController = require('./controllers/session');
const paymentController = require('./controllers/payment');
const seedController = require('./controllers/payment/seed.js');

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


// Payment

router.get('/session:session_id/users', paymentController.getSessionUsers);
router.get('/session:session_id/group_cart', paymentController.getSessionGroupCart);
router.put('/session:session_id/user:user_id/cart', paymentController.updateUserCart);
router.get('/orderStatus', paymentController.orderStatus);
router.post('/item:id/add', (req, res) => {
});

router.post('/item:id/delete', (req, res) => {
});

router.get('/user_id/cart', (req, res) => {
});

router.get('/pay', (req, res) => {
});


// Seed
// router.get('/seedUser', seedController.seedUser);
// router.get('/seedSession', seedController.seedSession);
// router.get('/testSeed', seedController.testSeed);
// router.get('/testSeed2', seedController.testSeed2);

module.exports = router;