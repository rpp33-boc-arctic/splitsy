// import mongoose from 'mongoose';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/splitsy')
  .then(() => {
    console.log('Connected to the splitsy database');
  })
  .catch((err) => {
    console.log('Unable to connect to database. ERROR: ', err);
  });

const userSchema = new mongoose.Schema({
  'username': { type: String, unique: true },
  'email': { type: String, unique: true },
  'user_id': { type: Number, unique: true },
  'password': String,
  'photo_url': String,
  'friends': [ Number ] // [ user_id ]
});

const sessionSchema = new mongoose.Schema({
  'session_code': { type: String, unique: true },
  'restaurant': {
    'restaurant_id': { type: String, unique: true },
    'name': String,
    'address': String,
  },
  'order_id': { type: String, unique: true },
  'users': {
    type: Map,
    of: new mongoose.Schema({
      'user_id': Number,
      'checkout?': Boolean,
      'user_cart': [ Number ] // [ order_item_id ]
    })
  },
  'group_cart': {
    type: Map,
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
  'order_paid?': Boolean
});

// export const User = mongoose.model('User', userSchema);
module.exports.User = mongoose.model('User', userSchema);
// export const Session = mongoose.model('Session', sessionSchema);
module.exports.Session = mongoose.model('Session', sessionSchema);
