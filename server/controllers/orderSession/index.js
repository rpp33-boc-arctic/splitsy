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

    function generateSession(username,restaurant_id,address,street_address,name){
    var obj = {
      order_code:codeGenerator(),
      restaurant: {'restaurant_id': restaurant_id, 'searchNear':address, 'address':street_address, 'name': name},
      order_id:uuidv4(),
      owner: username,
      users:{  [username]:{checkout:false,user_cart:[]}},
      group_cart:{ },
      receipt:{},
      total_tip: 0,
      total_tax: 0,
      total_paid: 0,
      grand_total: 0,
      total_owed: 0,
      order_paid: 0
    };
    return obj;
    }

        var sessionobj  = generateSession(req.query.username,req.query.restaurant_id,req.query.address,req.query.street_address,req.query.name);
        db.OrderSession.create(sessionobj).then(session=>{
          var payload = {
                session_id: session._id,
                owner: session.owner,
                code: session.order_code,
                address: session.restaurant.address,
                restaurant_id: session.restaurant_id
            };
           var token = jwt.sign(payload,'Server Password',{ expiresIn: '1h' });
              console.log(token);
          res.json({createCookie:true,token:token});
        }).catch(err=>{
          console.log(err);
        });



  }

}