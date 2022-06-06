var path = require('path');
var fs = require('fs');
var db  = require('../../../database/index.js')
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');


// Authorization: Bearer <token>

module.exports = {

  createSession: (req, res) => {

    var address = req.query.address;
    var username = req.query.username;
    var index = req.query.index;

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
    var session_code = codeGenerator();

    // make requests to find userid in db
    var obj = {
      session_code:session_code,
      restaurant: {'restaurant_id': index, 'searchNear':address, 'address':req.query.street_address, 'name': req.query.name},
      orderId:uuidv4(),
      users:{username:username,checkout:false,user_cart:[]},
      group_cart:{ },
      receipt:{},
      total_tip: 0,
      total_tax: 0,
      total_paid: 0,
      grand_total: 0,
      total_owed: 0,
      order_paid: 0
    };

    //create session;

    console.log(obj);
    db.Session.find({user:{username:username}}).then(results=>{
      if (results){
        // if session found verify that they are there and create token
        var payload = {
          code: session_code,
          username: username,
          index: index
        };
        var token = jwt.sign(payload,"server password",{ expiresIn: '1h' });
        res.send(token)
      } else {
        db.Session.create(obj).then(result=>{
        var payload = {
        code: session_code,
        username: username,
        index: index
      };
      var token = jwt.sign(payload,"server password",{ expiresIn: '1h' });
      res.send(token)
        });
      }
    }).catch(err=>{
      console.log(err)
    })

    db.Session.find().then(data=>{
      // console.log('data from orderSession',data);
      //check db if
      //if session found return them back to menu else create new session return back to menu
      // var payload = {
      //   code: sessioncode,
      //   username: username,
      //   index: index
      // };
      // // //for sessionuuid code
      // var token = jwt.sign(payload,"server password",{ expiresIn: '1h' });
      // res.send(token)
    })
    // db.sessionSchema.create(obj).then(result=>{
    //   //jwt cookie with session and can add people to session as well
    //   res.send()
    // })

  }

}