var PORT = 3001;
var app = require('./index.js');

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});