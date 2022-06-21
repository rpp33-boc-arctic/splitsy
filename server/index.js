const express = require("express");
const path = require("path");
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const app = express();
var cors = require('cors');
var jwt = require('jsonwebtoken');

var jwtMiddleware = function (req,res,next){
 try {
  const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      req.jwtObject = jwt.verify(token, 'Server Password');
      next()
  } catch(err){
    req.jwtObject = null;
    next()
  }
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(cors());
app.use(jwtMiddleware)
app.use('/', routes);

module.exports = app;