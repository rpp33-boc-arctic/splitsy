const router = require('express').Router();
// const controllers = require('./controllers');


// Authentication
router.post('/register', (req, res) => {
});

router.post('/login', (req, res) => {
});


// User profile
router.post('/logout', (req, res) => {
});
router.get('/user/history', (req, res) => {
});
router.get('/user', (req, res) => {
});
router.get('/user/friends', (req, res) => {
});


// Restaurants
router.get('/restaurantList', (req, res) => {
});
router.get('/:restaurant/menu', (req, res) => {
});


// Session
router.post('/session:id', (req, res) => {
});

// Cart
router.post('/session:id/order', (req, res) => {
});

// Checkout
router.post('/item:id/add', (req, res) => {
});

router.post('/item:id/delete', (req, res) => {
});

router.get('/user_id/cart', (req, res) => {
});

router.get('/pay', (req, res) => {
});

router.get('/status', (req, res) => {
});


module.exports = router;