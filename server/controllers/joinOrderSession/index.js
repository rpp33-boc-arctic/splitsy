var path = require('path');
var fs = require('fs');
var db  = require('../../../database/index.js')
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');


// Authorization: Bearer <token>

module.exports = {

  joinSession: (req, res,next) => {

    // join code
    // username

    // if session exists add user send token
    // make cookie true



  }

}