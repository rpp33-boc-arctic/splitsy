const router = require('express').Router();
const authController = require('./controllers/authentication');
const userController = require('./controllers/user');
const cartController = require('./controllers/cart');
const restaurantController = require('./controllers/restaurant');
const SessionController = require('./controllers/Session');
const paymentController = require('./controllers/payment');
const seedController = require('./controllers/payment/seed.js');
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
// SAMPLE USAGE
// router.get('/session:session_id', isAuthenticated, paymentController.getSession);
//code bellow works but was only intended for trying to see if the api was better than what was given which indeed it was except no menus
// if we have time we can put this back and call ubereeats api on every restraunt.
// router.get('/getAddress', (req,res)=>{
//   //params->
//   axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json',{params:{fields:"formatted_address,geometry",input:"12145 west jessie",inputtype:"textquery",key:process.env.PlacesAPI}}).then(data=>{
//     console.log(data)
//   //make maker on map
//     res.send(JSON.stringify(data.data.candidates));
//   });
// })

// router.get('/placesNearby', (req,res)=>{
//     //params->
// var query = req.query
// var keyword;
// console.log(req.query)
// query.location = JSON.parse(query.location)
//   axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',
//   {params:{fields:"name, photo",location:query.location.lat.toString()+','+query.location.lng.toString(),radius:"10000",type:"restaurant",keyword:"",key:process.env.PlacesAPI}}).then(response=>{
//     res.send(JSON.stringify(response.data));
//   });
// })

var jwtMiddleware = function (req, res, next) {
  const authHeader = req.headers.authorization;
  try {
    const token = authHeader.split(' ')[1];
    req.jwtObject = jwt.verify(token, 'Server Password');
    console.log('req.jwtObject inside jwtMiddleware is: ', req.jwtObject);
    next()
  } catch (err) {
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
router.get('/:restaurant/menu', (req, res) => { });


// Session
router.get('/Session', jwtMiddleware, SessionController.createSession);


// Cart
router.get('/session/get_cart', jwtMiddleware, cartController.getCart);
router.post('/session/update_cart', jwtMiddleware, cartController.updateCart);
router.post('/session/update_summary', jwtMiddleware, cartController.updateSummary);


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