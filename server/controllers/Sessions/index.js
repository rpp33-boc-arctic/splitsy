var path = require('path');
var fs = require('fs');
var db  = require('../../../database/index.js')
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');


// Authorization: Bearer <token>

module.exports = {

  createSession: (req, res,next) => {



    function codeGenerator(){
      var array = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
      var array2 = ["1","2","3","4","5","6","7","8","9","10","!","@","#","$","$","$","$","#"]
      array2=array.concat(array2);
      var symbols="";
      for (let i = 0; i <6; i ++){
        var randomnumber =Math.floor(Math.random() * array2.length-1)
        var symbol = array2[randomnumber]
        symbols+=symbol
      }
      return symbols;
    }
//make sure user_id passed in
 async function generateSession(username,restaurant_id,address,street_address,name,user_id){
   console.log('USER_ID ',user_id)
    db.Session.estimatedDocumentCount().then(id=>{
      var obj = {
        'session_code':parseInt(id) + 2,
        'restaurant': {'restaurant_id': restaurant_id, 'searchNear':address, 'address':street_address, 'name': name},
        'order_id':codeGenerator(),
        'owner': username,
        'users':{  [user_id]:{'checkout?':false,'user_cart':[],'user_id':user_id}},
        'group_cart':{ },
        'receipt':{},
        'total_tip': 0,
        'total_tax': 0,
        'total_paid': 0,
        'grand_total': 0,
        'total_owed': 0,
        'order_paid?':false
      };

      console.log(obj);
       db.Session.create(obj).then(session=>{
        var payload = {
              order_id: session.order_id,
              session_id: session._id,
              owner: session.owner,
              code: session.session_code,
              address: session.restaurant.address,
              restaurant_id: req.query.restaurant_id
          };
        var token = jwt.sign(payload,'Server Password',{ expiresIn: '1h' });
        res.json({createCookie:true,token:token});
      }).catch(err=>{
        console.log(err);
      });


    });


    }

        var sessionobj  = generateSession(req.query.username,req.query.restaurant_id,req.query.address,req.query.street_address,req.query.name,req.query.user_id);
  }

}