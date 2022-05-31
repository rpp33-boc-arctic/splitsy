const http = require('http');
const sum = require('./sum');
const mongoose = require('mongoose');
var app = require('./server/index.js');
var PORT = 3002;
var server;

beforeAll(async () => {
  server = await http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
  // done();
})

test('adds 1 + 2 to equal 3', (done) => {
  expect(sum(1,2)).toBe(3);
  done();
});

test('server is running',  (done) => {

  server.on('listening', () => {
    var result = server.address().port;
    console.log(result);
    expect(result).toBe(3002);
    expect(result).not.toBe(2000);
    done();
  })

});


afterAll( function () {
  server.close();
  mongoose.connection.close();
})