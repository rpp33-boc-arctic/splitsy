const express = require("express");
var path = require("path");
// const PORT = 3001;
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("/serverStatus", (req, res) => {
  res.end();
})

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

module.exports = app;