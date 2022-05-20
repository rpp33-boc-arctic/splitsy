const express = require("express");

const PORT = process.env.PORT || 3001;
//changed port because react app runs on 3000 as well
const path = require('path')
const app = express();

//added by grant m
app.use(express.static(path.join(__dirname,'../build')));
//end

app.get("/api", (req, res) => {
  res.json({ message: "Server Status: Active" });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
