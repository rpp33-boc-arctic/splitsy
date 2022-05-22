const express = require("express");
// const PORT = 3000; 
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get("/serverStatus", (req, res) => {
  res.end();
})

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

module.exports = app;