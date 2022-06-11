const express = require("express");
const path = require("path");
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();
var port = 3001;
var cors = require('cors');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/build")));

app.use(cors())
app.use('/', routes);

// app.get("/serverStatus", (req, res) => {
//   res.end();
// })


module.exports = app;