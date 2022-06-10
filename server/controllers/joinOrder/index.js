var path = require('path');
var fs = require('fs');
var db  = require('../../../database/index.js')
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');


// Authorization: Bearer <token>

module.exports = {

  joinOrder: (req, res,next) => {

    // if code not provided and cookie is cookie has the code and session id send over to client navigate over
    if (req.jwtToken){

      db.Restaurant.find({restaurant_id:req.jwtToken.restaurant_id}).then(data=>{
        res.json({redirect:true,menu:data});
      })

      //token is valid

    } else {
      //token invalid or gone
      res.status(400);
      res.json({redirect:false,data:undefined});
    }


    // join code
    // username

    // if session exists add user send token
    // make cookie true



  }

}