var path = require('path');
var fs = require('fs');
var db  = require('../../../database/index.js')
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');


// Authorization: Bearer <token>

module.exports = {

  joinOrder: (req, res,next) => {
    if (req.jwtObject){
      db.Restaurant.find({restaurant_id:req.jwtObject.restaurant_id}).then(data=>{
        res.json({redirect:true,menu:data[req.jwtObject.restaurant_id]});
      })
    } else {
      var code = req.query.join_code;
      db.Session.find({session_code:code}).then(foundSession=>{

        if (foundSession){
          var payload = {
            session_id: foundSession._id,
            owner: foundSession.owner,
            code: foundSession.session_code,
            address: foundSession.restaurant.address,
            restaurant_id: foundSession.restaurant_id
        };
       var token = jwt.sign(payload,'Server Password',{ expiresIn: '1h' });
       db.updateOne({_id:foundSession._id}, {'$set': {['users.'+req.query.username]:{'user_id':null,'checkout?':false,'user_cart':[]} } }).then(response=>{

        res.json({redirect:true,token:token})

       })
        } else {
          res.json({redirect:false})
        }
      })
      res.status(400);
      res.json({redirect:false,data:undefined});
    }


    // join code
    // username

    // if session exists add user send token
    // make cookie true



  }

}