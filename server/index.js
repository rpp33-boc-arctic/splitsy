const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Server Status: Active" });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
