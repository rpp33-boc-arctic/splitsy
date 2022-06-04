const router = require('express').Router();
const authController = require('./controllers/authentication');
const userController = require('./controllers/user');
const cartController = require('./controllers/cart');
const restaurantController = require('./controllers/restaurant');
const sessionController = require('./controllers/session');
const paymentController = require('./controllers/payment');
const seedController = require('./controllers/payment/seed.js');

var dot = require('dotenv').config()
var axios = require('axios');
// Authentication
router.get('/getAddress', (req,res)=>{
  //params->
  axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json',{params:{fields:"formatted_address,geometry",input:"12145 west jessie",inputtype:"textquery",key:process.env.PlacesAPI}}).then(data=>{
    console.log(data)
  //make maker on map
    res.send(JSON.stringify(data.data.candidates));

  });
})

router.get('/placesNearby', (req,res)=>{
    //params->
var query = req.query
var keyword;
console.log(req.query)
query.location = JSON.parse(query.location)
  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',
  {params:{fields:"name, photo",location:query.location.lat.toString()+','+query.location.lng.toString(),radius:"10000",type:"restaurant",keyword:"",key:process.env.PlacesAPI}}).then(response=>{
    res.send(JSON.stringify(response.data));
  });
})


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


// User profile
router.get('/user', userController.profile);
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
router.get('/session:id/cart', cartController.getCart);
router.put('/session:id/add', cartController.updateCart);



// Payment

router.get('/session:session_id/users', paymentController.getSessionUsers);
router.get('/session:session_id', paymentController.getSession);
router.put('/session:session_id/user:user_id/cart', paymentController.updateUserCart);
router.delete('/session:session_id/user:user_id/cart', paymentController.removeOneFromUserCart);

router.get('/session:session_id/userInfo', paymentController.getUserInfo);
router.put('/session:session_id/user:user_id/pay', paymentController.updateUserPay);
router.put('/session:session_id/user:user_id/receipt', paymentController.updateReceipt);

router.get('/session:session_id/retrieveTotal', (req, res) => {});
router.put('/session:session_id/updateTotal', (req, res) => {});

// Seed
// router.get('/seedUser', seedController.seedUser);
// router.get('/seedSession', seedController.seedSession);
// router.get('/testSeed', seedController.testSeed);
// router.get('/testSeed2', seedController.testSeed2);

module.exports = router;