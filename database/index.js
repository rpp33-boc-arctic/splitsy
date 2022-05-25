import mongoose from 'mongoose';

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
  'friends': [ Number ]
});

const sessionSchema = new mongoose.Schema({
  'session_code': { type: String, unique: true },
  'restaurant': {
    'restaurant_id': { type: String, unique: true },
    'name': String,
    'address': String,
  },
  'order_id': { type: String, unique: true },
  'users': [
    {
      'user_id': Number,
      'checkout?': Boolean,
      'user_cart': [ Number ]
    }
  ],
  'group_cart': [
    {
      'order_item_id': Number,
      'menu_item_id': Number,
      'menu_item_name': String,
      'menu_item_description': String,
      'menu_item_photo': String,
      'menu_item_price': Number,
      'user_id': Number,
      'paid?': Boolean
    }
  ],
  'receipt': [
    type: Map,
    of: new mongoose.Schema({
      'items': [ Number ],
      'user_tip': Number,
      'total_paid': Number
    })
  ],
  'total_tip': Number,
  'total_tax': Number,
  'total_paid': Number,
  'grand_total': Number,
  'total_owed': Number,
  'order_paid?': Boolean
});

export const User = mongoose.model('User', userSchema);

export const Session = mongoose.model('Session', sessionSchema);
