require('dotenv').config();
const mongoose = require('mongoose');
const dbAddress = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWLRD}@18.141.196.227:27017/splitsy?authSource=admin`;

// mongoose.connect('mongodb://localhost:27017/splitsy')
mongoose.connect(dbAddress) // consider save in the variable
  .then(() => {
    console.log('Connected to the splitsy database');
  })
  .catch((err) => {
    console.log('Unable to connect to database. ERROR: ', err);
  });

const Restaurant = new mongoose.Schema({
  'restaurants':[]
});

const userSchema = new mongoose.Schema({
  'username': { type: String, unique: true },
  'firstname': String,
  'lastname': String,
  'email': { type: String, unique: true },
  'user_id': { type: Number, unique: true },
  'password': String,
  'photo_url': String,
  'friends': [ Number ], // [ user_id ]
  'previous_session_codes': [ String ], // [ session_code ]
  'session_cookie': [ { type: String, unique: true } ]
});

const sessionSchema = new mongoose.Schema({
  'session_code': { type: String, unique: true },
  'restaurant': {
    'restaurant_id':String ,
    'name': String,
    'address': String,
  },
  'order_id': { type: String, unique: true },
  'users': {
    type: Map, // key -> 'user_id'
    of: new mongoose.Schema({
      'user_id': Number,
      'checkout?': Boolean,
      'user_cart': [ Number ] // [ order_item_id ]
    })
  },
  'group_cart': {
    type: Map, // key -> 'order_item_id'
    of: new mongoose.Schema({
      'order_item_id': Number,
      'menu_item_id': Number,
      'menu_item_name': String,
      'menu_item_description': String,
      'menu_item_photo': String,
      'menu_item_price': Number,
      'user_id': Number,
      'paid?': Boolean
    })
  },
  'receipt': {
    type: Map, // key -> 'user_id'
    of: new mongoose.Schema({
      'items': [ Number ], // [ order_item_id ]
      'user_tip': Number,
      'total_paid': Number
    })
  },
  'total_tip': Number,
  'total_tax': Number,
  'total_paid': Number,
  'grand_total': Number,
  'total_owed': Number,
  'order_paid?': Boolean,
  'date': String
});

// export const User = mongoose.model('User', userSchema);
module.exports.Restaurant = mongoose.model('Restaurant', Restaurant);

module.exports.User = mongoose.model('User', userSchema);
module.exports.Session = mongoose.model('Session', sessionSchema);
