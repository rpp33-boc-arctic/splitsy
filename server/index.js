const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get("/serverStatus", (req, res) => {
  console.log('server hit');
  res.json("Server Status: Active");
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
