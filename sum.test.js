const http = require('http');
const sum = require('./sum');
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

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1,2)).toBe(3);
});

test('server is running',  async() => {

  server.on('listening', () => {
    var result = await server.address().port;
    console.log(result);
    expect(result).toBe(3002);
    expect(result).not.toBe(2000);
  })

});


afterAll( function () {
  server.close();
})